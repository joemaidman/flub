import * as glob from 'glob';
import * as measureTime from 'measure-time';
import * as fs from 'fs';
import * as requireFromString from 'require-from-string';
import * as findRequires from 'find-requires';

import { Counter } from '../counter';
import Spy from '../spy/Spy';
import { printStartHeader } from '../logging/printStartHeader';
import {
    scanTreeForFunction,
    replaceChildFunctionCalls,
    replaceFunctionCalls,
} from '../parser';
import { failureList, clearFailures } from '../reporter/FailureReport';
import ContextChain from '../context/ContextChain';
import HooksManager from '../hooks/HookManager';
import { convertRelativePath } from '../utilities';
import {
    printCaughtException,
    printTestSummary,
    printFailures,
} from '../logging';

export const runner = (ext: string, nosumm: boolean, watch: boolean) => {
    let getElapsed: Function;

    const globString: string = ext
        ? '!(node_modules)**/*.' + ext + '.js'
        : '!(node_modules)**/*.spec.js';

    getElapsed = measureTime();
    printStartHeader();

    glob(globString, { cwd: process.cwd() }, function(
        _: any,
        files: Array<string>
    ) {
        files.forEach((file: any) => {
            try {
                let sanitisedSource: string = fs.readFileSync(
                    process.cwd() + '/' + file,
                    'UTF8'
                );
                const reqs = findRequires(sanitisedSource);
                reqs.map(req => {
                    if (req !== 'bed-rock')
                        delete require.cache[
                            require.resolve(
                                convertRelativePath(
                                    process.cwd() + '/' + file,
                                    req
                                )
                            )
                        ];
                });
                if (scanTreeForFunction(sanitisedSource, 'xcontext')) {
                    sanitisedSource = replaceChildFunctionCalls(
                        sanitisedSource,
                        'xcontext',
                        'context',
                        'xcontext'
                    );
                    sanitisedSource = replaceChildFunctionCalls(
                        sanitisedSource,
                        'xcontext',
                        'test',
                        'xtest'
                    );
                    sanitisedSource = replaceChildFunctionCalls(
                        sanitisedSource,
                        'xcontext',
                        'ftest',
                        'xtest'
                    );
                }
                if (scanTreeForFunction(sanitisedSource, 'ftest')) {
                    sanitisedSource = replaceFunctionCalls(
                        sanitisedSource,
                        'test',
                        'xtest'
                    );
                }
                requireFromString(sanitisedSource);
            } catch (error) {
                printCaughtException(error.message, error.stack);
            }
        });

        printTestSummary(getElapsed());

        if (!nosumm) {
            printFailures(failureList);
        }

        clearFailures();
        Counter.reset();
        ContextChain.reset();
        Spy.restoreAllSpies();
        Spy.clearSpyList();
        HooksManager.clearHooks();
    });
};
