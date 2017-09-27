#!/usr/bin/env node

import * as glob from 'glob';
import * as measureTime from 'measure-time';
import * as chokidar from 'chokidar';
import * as clearRequire from 'clear-require';
import * as path from 'path';
import * as flags from 'flags'
import { JSDOM } from 'jsdom';

import Counter from './models/Counter';
import Spy from './models/Spy';
import Hooks from './models/Hooks'
import {
  printStartHeader,
  printReloadHeader,
  printTestSummary,
  printWatching,
  printCaughtException
} from './models/Logging';

const BedRock = (() => {
  global['window'] = new JSDOM().window;
  global['document'] = window.document;
  let getElapsed: Function;
  const globString: string = "*.spec.js";
  const regexString: RegExp = new RegExp('.*?(?=\.spec).*?\.js');
  let testFiles: Array<string> = new Array<string>();
  Counter.resetCount();
  getElapsed = measureTime();
  printStartHeader();

  glob(globString, { cwd: process.cwd() }, function (error: any, files: Array<string>) {
    files.forEach((file: any) => {
      testFiles.push(process.cwd() + '/' + file);
      try {
        require(process.cwd() + '/' + file);
      }
      catch (error) {
        Counter.resetCount();
        Spy.restoreAllSpies();
        Spy.clearSpyList();
        printCaughtException(error);
      }
      Hooks.getTearDownHook()();
      Hooks.clearHooks();
    });

    printTestSummary(getElapsed());

    if (process.argv.indexOf('--watch') > 0) {
      printWatching();
      const watcher = chokidar.watch(process.cwd());

      watcher.on('change', (event: string) => {
        testFiles = new Array();
        Counter.resetCount();
        Spy.restoreAllSpies();
        Spy.clearSpyList();

        clearRequire.match(regexString);
        getElapsed = measureTime();
        printReloadHeader();

        files.forEach((file: any) => {
          testFiles.push(
            process.cwd() + '/' + file);
          try {
            require(process.cwd() + '/' + file)
          }
          catch (error) {
            Counter.resetCount();
            Spy.restoreAllSpies();
            Spy.clearSpyList();
            printCaughtException(error);
          }
          Hooks.getTearDownHook()();
          Hooks.clearHooks();
        });
        printTestSummary(getElapsed())
      });
    }
  });
})();