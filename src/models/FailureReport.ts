import Report from './Report';
import Reporter from './Reporter';
import MessageType from './MessageType';
import { printCaughtException } from './Logging';

export class FailureReport {
    des: string;
    contextChain: string;
    failureType: string;
    failureMessages: Array<Report>;
    prettyTrace: string;

    constructor(des: string, contextChain: string, failureType: string, failureMessages: Array<Report>, prettyTrace: string) {
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