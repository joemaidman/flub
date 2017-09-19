import MessageType from './MessageType'
import {
    MessageStrategy,
    DefaultMessageStrategy,
    OKMessageStrategy,
    ErrorMessageStrategy,
    RootMessageStrategy,
    getMessageStrategy
} from './MessageStrategies'

class Reporter {

    private static instance: Reporter;

    static getInstance() {
        if (!Reporter.instance) {
            Reporter.instance = new Reporter();
        }
        return Reporter.instance;
    }

    report(message: string, messageType: MessageType, counter: number): void {
        getMessageStrategy(messageType).print(message, counter, console);
    }

}

export default Reporter;