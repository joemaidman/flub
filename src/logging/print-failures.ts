import Reporter from '../reporter/reporter';
import Report from '../reporter/report';
import { FailureReport } from '../reporter/failure-report';
import MessageType from '../messages/message-type';

export const printFailures = (failureList: Array<FailureReport>): void => {
    if (failureList.length > 0) {
        Reporter.report(new Report(' ', MessageType.DEFAULT));
        Reporter.report(new Report('Test Failures:', MessageType.ROOT)), true;
        Reporter.report(new Report(' ', MessageType.DEFAULT));

        failureList.forEach((failure: FailureReport) => {
            failure.print();
        });
    }
};
