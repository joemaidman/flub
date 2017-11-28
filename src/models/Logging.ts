import MessageType from './MessageType';
import Reporter from './Reporter';
import Report from './Report';
import * as Counter from './Counter';
import { FailureReport } from './FailureReport';

export const printStartHeader = () => {
    Reporter.report(
        new Report('Bedrock starting...',
            MessageType.DEFAULT)
    );
    Reporter.report(
        new Report('',
            MessageType.DEFAULT)
    );
};

export const printReloadHeader = () => {
    Reporter.report(
        new Report(
            '',
            MessageType.DEFAULT)
    );
    Reporter.report(
        new Report('Bedrock reloading...',
            MessageType.DEFAULT)
    );
    Reporter.report(
        new Report([''],
            MessageType.DEFAULT)
    );
};

export const printWatching = () => {
    Reporter.report(
        new Report(
            '',
            MessageType.DEFAULT)
    );
    Reporter.report(
        new Report('Watching files...',
            MessageType.DEFAULT)
    );
    Reporter.report(
        new Report('',
            MessageType.DEFAULT)
    );
};

export const printTestSummary = (elapsed: any) => {
    Reporter.report(
        new Report('',
            MessageType.DEFAULT)
    );
    Reporter.report(
        new Report('Ran ' + Counter.testCount
            + ' tests in '
            + elapsed.millisecondsTotal
            + ' ms',
            MessageType.DEFAULT)
    );
    Reporter.report(
        new Report(Counter.passCount + ' passed',
            MessageType.OK)
    );
    Reporter.report(
        new Report(Counter.failCount + ' failed',
            MessageType.ERROR)
    );
    if (Counter.ignoreCount > 0) {
        
        Reporter.report(
            new Report(Counter.ignoreCount + ' ignored',
            MessageType.IGNOREDTEST)
        );
    }

};

export const printCaughtException = (stack: string, message: string = '') => {
    Reporter.report(
        new Report(message === '' ? [stack || ''] : [message, stack || ''],
            MessageType.STACK)
    );
};


export const printFailures = (failureList: Array<FailureReport>): void => {
    if (failureList.length > 0) {
        Reporter.report(new Report(' ', MessageType.DEFAULT));
        Reporter.report(new Report('Test Failures:', MessageType.ROOT));
        Reporter.report(new Report(' ', MessageType.DEFAULT));

        failureList.forEach((failure: FailureReport) => {
            failure.print();
        });
    }
};

