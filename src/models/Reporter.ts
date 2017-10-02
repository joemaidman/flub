import MessageType from './MessageType'
import Report from './Report'
import { getMessageStrategy } from './MessageStrategies'

class Reporter {

    private static instance: Reporter;

    static getInstance() {
        if (!Reporter.instance) {
            Reporter.instance = new Reporter();
        }
        return Reporter.instance;
    }

    report(report: Report): void {
        getMessageStrategy(report.messageType)
            .print(report.messages, report.counter, console);
    }
}

export default Reporter;