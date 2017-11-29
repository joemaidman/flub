import * as glob from 'glob';
import * as measureTime from 'measure-time';
import * as chokidar from 'chokidar';
import * as clearRequire from 'clear-require';
import * as path from 'path';
import * as flags from 'flags';
import { JSDOM } from 'jsdom';
import * as Esprima from 'esprima';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';
import * as fs from 'fs';
import * as requireFromString from 'require-from-string';

import * as Counter from './models/Counter';
import Spy from './models/Spy';
import Hooks from './models/Hooks';
import {
  printStartHeader,
  printReloadHeader,
  printTestSummary,
  printWatching,
  printCaughtException,
  printFailures
} from './models/Logging';
import {
  failureList,
  FailureReport,
  clearFailures
} from './models/FailureReport';
import Report from './models/Report';
import Reporter from './models/Reporter';
import MessageType from './models/MessageType';
import {
  replaceFunctionCalls,
  scanTreeForFunction,
  replaceChildFunctionCalls
} from './models/Parser';

const BedRock = () => {
  flags.defineString('ext', 'spec', 'Test file extentions');
  flags.defineBoolean('watch');
  flags.defineBoolean('nodom');
  flags.defineBoolean('nosumm');
  flags.parse();

  if (!flags.get('nodom')) {
    global['window'] = new JSDOM().window;
    global['document'] = window.document;
  }

  let getElapsed: Function;

  const globString: string = flags.get('ext') ? '*.' + flags.get('ext') + '.js' : '*.spec.js';

  const regexString: RegExp = new RegExp('.*?(?=\.' + flags.get('ext') + ').*?\.js');
  let testFiles: Array<string> = new Array<string>();
  Counter.reset();
  getElapsed = measureTime();
  printStartHeader();

  glob(globString, { cwd: process.cwd() }, function (error: any, files: Array<string>) {
    files.forEach((file: any) => {
      testFiles.push(process.cwd() + '/' + file);
      try {
        let sanitisedSource: string = fs.readFileSync(process.cwd() + '/' + file, 'UTF8');

        if (scanTreeForFunction(sanitisedSource, 'xcontext')) {
          sanitisedSource = replaceChildFunctionCalls(sanitisedSource, 'xcontext', 'context', 'xcontext');
          sanitisedSource = replaceChildFunctionCalls(sanitisedSource, 'xcontext', 'test', 'xtest');
          sanitisedSource = replaceChildFunctionCalls(sanitisedSource, 'xcontext', 'ftest', 'xtest');
        }
        if (scanTreeForFunction(sanitisedSource, 'ftest')) {
          sanitisedSource = replaceFunctionCalls(sanitisedSource, 'test', 'xtest');
        }
        requireFromString(sanitisedSource);
      }
      catch (error) {
        Counter.reset();
        Spy.restoreAllSpies();
        Spy.clearSpyList();
        printCaughtException(error.message, error.stack);
      }
      Hooks.clearHooks();
    });

    printTestSummary(getElapsed());

    if (!flags.get('nosumm')) {
      printFailures(failureList);
    }

    clearFailures();

    if (flags.get('watch')) {
      printWatching();
      const watcher = chokidar.watch(process.cwd());

      watcher.on('change', (event: string) => {
        testFiles = new Array();
        Counter.reset();
        Spy.restoreAllSpies();
        Spy.clearSpyList();

        clearRequire.match(regexString);
        getElapsed = measureTime();
        printReloadHeader();

        files.forEach((file: any) => {
          testFiles.push(
            process.cwd() + '/' + file);
          try {
            let sanitisedSource: string = fs.readFileSync(process.cwd() + '/' + file, 'UTF8');

            if (scanTreeForFunction(sanitisedSource, 'xcontext')) {
              sanitisedSource = replaceChildFunctionCalls(sanitisedSource, 'xcontext', 'context', 'xcontext');
              sanitisedSource = replaceChildFunctionCalls(sanitisedSource, 'xcontext', 'test', 'xtest');
              sanitisedSource = replaceChildFunctionCalls(sanitisedSource, 'xcontext', 'ftest', 'xtest');
            }
            if (scanTreeForFunction(sanitisedSource, 'ftest')) {
              sanitisedSource = replaceFunctionCalls(sanitisedSource, 'test', 'xtest');
            }
            requireFromString(sanitisedSource);
          }
          catch (error) {
            Counter.reset();
            Spy.restoreAllSpies();
            Spy.clearSpyList();
            throw error;
            // printCaughtException(error.message, error.stack);
          }
          Hooks.clearHooks();
        });

        printTestSummary(getElapsed());

        if (!flags.get('nosumm')) {
          printFailures(failureList);
        }

        clearFailures();

      });
    }
  });
};

export default BedRock;