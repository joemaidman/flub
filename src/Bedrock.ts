#!/usr/bin/env node

import * as glob from 'glob';
import * as measureTime from 'measure-time';
import * as chokidar from 'chokidar';
import * as clearRequire from 'clear-require';
import * as path from 'path';
import { context, it, assert } from './models/core';
import * as flags from 'flags'

global['testCount'] = 0;

let getElapsed: Function;

const BedRock = () => {
  console.log(process.cwd())
  const globString: string = "*.spec.js";
  const regexString: RegExp = new RegExp('.*?(?=\.spec).*?\.js');
  let testFiles: Array<string> = new Array<string>();
  getElapsed = measureTime();

  glob(globString, { cwd: process.cwd() }, function (error: any, files: Array<string>) {

    files.forEach((file: any) => {
      testFiles.push(process.cwd() + '/' + file);
      require(process.cwd() + '/' + file);
    });

    reportTests(getElapsed());

    if (process.argv.indexOf('--watch') > 0) {

      const watcher = chokidar.watch(process.cwd());

      watcher.on('change', (event: string) => {

        clearRequire.match(regexString);
        getElapsed = measureTime();

        files.forEach((file: any) => {
          testFiles.push(process.cwd() + '/' + file);
          require(process.cwd() + '/' + file);
        });

        reportTests(getElapsed())

      });
    }
  });
}

const reportTests = (elapsed: any) => {
  console.log("Ran "
    + global['testCount'] +
    " tests in " +
    elapsed.millisecondsTotal +
    " ms");
}

BedRock();