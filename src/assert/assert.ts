import * as PrettyError from 'pretty-error';

import MessageType from '../messages/message-type';
import { Counter } from '../counter';
import { errorStyle } from '../resources/error-style';
import Expectation from '../expectation/expectation';
import { failureList, FailureReport } from '../reporter/failure-report';
import Reporter from '../reporter/reporter';
import Report from '../reporter/report';

export function assert(testResult: boolean, expectation: Expectation): boolean {
    if (expectation.isNot ? testResult : !testResult) {
        const failureMessages: Report[] = [];
        Reporter.report(new Report([expectation.des], MessageType.ERROR));

        if (expectation.isNot) {
            expectation.failureDetails[2] =
                'not ' + expectation.failureDetails[2];
        }
        failureMessages.push(
            new Report(expectation.failureDetails, MessageType.COMPARISON)
        );
        expectation.failureMessages = failureMessages;
        Counter.incrementFailCount();
        try {
            throw new Error('Assertion error');
        } catch (error) {
            let prettyError = new PrettyError();
            prettyError.skipPackage('flub');
            prettyError.appendStyle(errorStyle);

            let prettyTrace = prettyError.render(error);
            failureList.push(
                new FailureReport(
                    expectation.des,
                    failureList.length +
                    1 +
                    ') ' +
                    expectation.contextChain.join(' => ') +
                    ' => ' +
                    expectation.des +
                    ': ',
                    error.message,
                    expectation.failureMessages,
                    prettyTrace
                )
            );
        }
        return false;
    } else {
        Reporter.report(new Report([expectation.des], MessageType.OK));
        Counter.incrementPassCount();
        return true;
    }
}
