import * as glob from 'glob';
import * as measureTime from 'measure-time';
import * as chokidar from 'chokidar';
import * as flags from 'flags';
import { JSDOM } from 'jsdom';
import * as fs from 'fs';
import * as requireFromString from 'require-from-string';
import * as findRequires from 'find-requires';

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
  clearFailures
} from './models/FailureReport';
import {
  replaceFunctionCalls,
  scanTreeForFunction,
  replaceChildFunctionCalls
} from './models/Parser';
import ContextChain from './models/ContextChain';

function magic(base, relative) {
  let stack = base.split('/');
  let parts = relative.split('/');
  stack.pop();
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === '.')
      continue;
    if (parts[i] === '..')
      stack.pop();
    else
      stack.push(parts[i]);
  }
  return stack.join('/');
}

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

  const globString: string = flags.get('ext') ? '!(node_modules)**/*.' + flags.get('ext') + '.js' : '!(node_modules)**/*.spec.js';

  let testFiles: Array<string> = new Array<string>();
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
        printCaughtException(error.message, error.stack);

      }

    });

    printTestSummary(getElapsed());
    Counter.reset();
    ContextChain.reset();
    Spy.restoreAllSpies();
    Spy.clearSpyList();
    Hooks.clearHooks();

    if (!flags.get('nosumm')) {
      printFailures(failureList);
    }

    clearFailures();

    if (flags.get('watch')) {
      printWatching();
      const watcher = chokidar.watch(process.cwd(), {
        usePolling: true,
        interval: 100,
      });
      let running = false;
      watcher.on('change', (event: string) => {
        if (!running) {
          running = true;
          testFiles = new Array();
          Counter.reset();
          ContextChain.reset();
          Spy.restoreAllSpies();
          Spy.clearSpyList();

          getElapsed = measureTime();
          printReloadHeader();

          files.forEach((file: any) => {
            testFiles.push(
              process.cwd() + '/' + file);
            try {
              let sanitisedSource: string = fs.readFileSync(process.cwd() + '/' + file, 'UTF8');
              const reqs = findRequires(sanitisedSource);
              reqs.map(req => { if (req !== 'bed-rock') delete require.cache[require.resolve(magic((process.cwd() + '/' + file), req))]; });

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
              printCaughtException(error.message, error.stack);
            }
            Hooks.clearHooks();
          });

          printTestSummary(getElapsed());
          Counter.reset();
          ContextChain.reset();
          Spy.restoreAllSpies();
          Spy.clearSpyList();

          if (!flags.get('nosumm')) {
            printFailures(failureList);
          }

          clearFailures();
          running = false;
        }
      });
    }
  });
};

export default BedRock;