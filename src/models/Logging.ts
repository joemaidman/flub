import MessageType from './MessageType';
import Reporter from './Reporter';
import Report from './Report';
import * as Counter from './Counter';

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
};

export const printCaughtException = (stack: string, message: string = '') => {
    Reporter.report(
        new Report(message === '' ? [stack || ''] : [message, stack || ''],
            MessageType.STACK)
    );
};
