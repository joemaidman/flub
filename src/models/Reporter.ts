import MessageType from './MessageType'
import Report from './Report'
import { getMessageStrategy } from './MessageStrategies'
import * as Counter from './Counter';

class Reporter {

    static report(report: Report): void {
        getMessageStrategy(report.messageType)
            .print(report.messages, Counter.depth, console);
    }
}

export default Reporter;