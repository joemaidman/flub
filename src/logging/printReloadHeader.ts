import MessageType from '../messages/MessageType';
import Reporter from '../reporter/Reporter';
import Report from '../reporter/Report';

export const printReloadHeader = () => {
    Reporter.report(new Report('', MessageType.DEFAULT));
    Reporter.report(
        new Report('Bedrock reloading...', MessageType.DEFAULT),
        true
    );
    Reporter.report(new Report([''], MessageType.DEFAULT));
};
