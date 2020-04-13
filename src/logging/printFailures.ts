import Reporter from '../reporter/Reporter';
import Report from '../reporter/Report';
import { FailureReport } from '../reporter/FailureReport';
import MessageType from '../messages/MessageType';

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
