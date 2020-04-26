import Report from '../reporter/report';
import MessageType from '../messages/message-type';
import Reporter from '../reporter/reporter';
import { Counter } from '../counter';

export const printTestSummary = (elapsed: any) => {
    Reporter.report(new Report('', MessageType.DEFAULT));
    Reporter.report(
        new Report(
            'Ran ' +
            Counter.testCount +
            ' tests in ' +
            elapsed.millisecondsTotal +
            ' ms',
            MessageType.DEFAULT
        ),
        true
    );
    Reporter.report(
        new Report(Counter.passCount + ' passed', MessageType.OK),
        true
    );
    if (Counter.failCount > 0) {
        Reporter.report(
            new Report(Counter.failCount + ' failed', MessageType.ERROR),
            true
        );
    }
    if (Counter.ignoreCount > 0) {
        Reporter.report(
            new Report(
                Counter.ignoreCount + ' ignored',
                MessageType.IGNORED_TEST
            ),
            true
        );
    }
};
