#!/usr/bin/env node

import * as glob from 'glob';
import * as measureTime from 'measure-time';
import * as chokidar from 'chokidar';
import * as clearRequire from 'clear-require';
import * as path from 'path';
import * as flags from 'flags'

import { printTestHeader, printTestSummary, printWatching } from './models/logging';

const BedRock = (() => {
  let getElapsed: Function;
  const globString: string = "*.spec.js";
  const regexString: RegExp = new RegExp('.*?(?=\.spec).*?\.js');
  let testFiles: Array<string> = new Array<string>();

  global['testCount'] = 0;
  getElapsed = measureTime();

  printTestHeader();

  glob(globString, { cwd: process.cwd() }, function (error: any, files: Array<string>) {

    files.forEach((file: any) => {
      testFiles.push(process.cwd() + '/' + file);
      require(process.cwd() + '/' + file);
    });

    printTestSummary(getElapsed());

    if (process.argv.indexOf('--watch') > 0) {

      printWatching();

      const watcher = chokidar.watch(process.cwd());

      watcher.on('change', (event: string) => {

        testFiles = new Array();
        clearRequire.match(regexString);
        getElapsed = measureTime();
        printTestHeader();

        files.forEach((file: any) => {
          testFiles.push(process.cwd() + '/' + file);
          require(process.cwd() + '/' + file);
        });

        printTestSummary(getElapsed())

      });
    }
  });
})()