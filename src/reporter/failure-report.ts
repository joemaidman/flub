import Report from './report';
import Reporter from './reporter';
import MessageType from '../messages/message-type';
import { printCaughtException } from '../logging/print-caught-exception';

export class FailureReport {
    des: string;
    contextChain: string;
    failureType: string;
    failureMessages: Array<Report>;
    prettyTrace: string;

    constructor(
        des: string,
        contextChain: string,
        failureType: string,
        failureMessages: Array<Report>,
        prettyTrace: string
    ) {
        this.des = des;
        this.contextChain = contextChain;
        this.failureMessages = failureMessages;
        this.failureType = failureType;
        this.prettyTrace = prettyTrace;
    }

    print(): void {
        Reporter.report(new Report(this.contextChain, MessageType.DEFAULT));
        this.failureMessages.forEach((report: Report) => {
            report.indent = true;
            Reporter.report(report);
        });
        printCaughtException(this.prettyTrace);
    }
}

export const failureList = new Array<FailureReport>();

export const clearFailures = (): void => {
    failureList.length = 0;
};
