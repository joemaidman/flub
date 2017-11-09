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

import * as Counter from './models/Counter';
import Spy from './models/Spy';
import Hooks from './models/Hooks';
import {
  printStartHeader,
  printReloadHeader,
  printTestSummary,
  printWatching,
  printCaughtException
} from './models/Logging';
import { failureList, FailureReport } from './models/FailureReport';
import Report from './models/Report';
import Reporter from './models/Reporter';
import MessageType from './models/MessageType';

const BedRock = () => {
  global['window'] = new JSDOM().window;
  global['document'] = window.document;
  let getElapsed: Function;

  flags.defineString('ext', '*.spec.js', 'Test file extentions');
  flags.defineBoolean('watch');
  flags.parse();

  const globString: string = flags.get('ext') ? flags.get('ext') : '*.spec.js';

  const regexString: RegExp = new RegExp('.*?(?=\.spec).*?\.js');
  let testFiles: Array<string> = new Array<string>();
  Counter.reset();
  getElapsed = measureTime();
  printStartHeader();

  glob(globString, { cwd: process.cwd() }, function (error: any, files: Array<string>) {
    files.forEach((file: any) => {
      testFiles.push(process.cwd() + '/' + file);
      try {
        require(process.cwd() + '/' + file);
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
    printFailures();
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
            require(process.cwd() + '/' + file);
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
        printFailures();
        clearFailures();
      });
    }
  });
};

const printFailures = (): void => {
  Reporter.report(new Report(' ', MessageType.DEFAULT));
  Reporter.report(new Report('Test Failures:', MessageType.ROOT));
  Reporter.report(new Report(' ', MessageType.DEFAULT));
  failureList.forEach((failure: FailureReport) => {
    failure.print();
  });
};

const clearFailures = (): void => {
  failureList.length = 0;
};

export default BedRock;