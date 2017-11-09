import MessageType from './MessageType';
import Report from './Report';
import { getMessageStrategy } from './MessageStrategies';
import * as Counter from './Counter';

class Reporter {

    static report(report: Report): void {
        if (report.indent === true) {
            report.messages[0] = '    ' + report.messages[0];
        } 
        getMessageStrategy(report.messageType)
            .print(report.messages, Counter.depth, console);
    }
}

export default Reporter;