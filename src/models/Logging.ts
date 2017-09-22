import MessageType from './MessageType';
import Reporter from './Reporter';
import Report from './Report';
import Counter from './Counter';

export const printStartHeader = () => {
    Reporter.getInstance().report(
        new Report('Bedrock starting...',
            MessageType.DEFAULT,
            0)
    );
    Reporter.getInstance().report(
        new Report('',
            MessageType.DEFAULT,
            0)
    );
}

export const printReloadHeader = () => {
    Reporter.getInstance().report(
        new Report(
            '',
            MessageType.DEFAULT,
            0)
    );
    Reporter.getInstance().report(
        new Report('Bedrock reloading...',
            MessageType.DEFAULT,
            0)
    );
    Reporter.getInstance().report(
        new Report([''],
            MessageType.DEFAULT,
            0)
    );
}

export const printWatching = () => {
    Reporter.getInstance().report(
        new Report(
            '',
            MessageType.DEFAULT,
            0)
    );
    Reporter.getInstance().report(
        new Report('Watching files...',
            MessageType.DEFAULT,
            0)
    );
    Reporter.getInstance().report(
        new Report('',
            MessageType.DEFAULT,
            0)
    );
}

export const printTestSummary = (elapsed: any) => {
    Reporter.getInstance().report(
        new Report('',
            MessageType.DEFAULT,
            0)
    );
    Reporter.getInstance().report(
        new Report("Ran " + Counter.getTestCount()
            + " tests in "
            + elapsed.millisecondsTotal
            + " ms",
            MessageType.DEFAULT,
            0)
    );
    Reporter.getInstance().report(
        new Report(Counter.getPassCount() + ' passed',
            MessageType.OK,
            0)
    );
    Reporter.getInstance().report(
        new Report(Counter.getFailCount() + ' failed',
            MessageType.ERROR,
            0)
    );
}

export const printCaughtException = (error: Error) => {
    Reporter.getInstance().report(
        new Report([error.message, error.stack || ''],
            MessageType.ERROR,
            0)
    );
}
