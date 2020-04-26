import MessageType from '../messages/message-type';
import Reporter from '../reporter/reporter';
import Report from '../reporter/report';

export const printReloadHeader = () => {
    Reporter.report(new Report('', MessageType.DEFAULT));
    Reporter.report(
        new Report('Flub reloading...', MessageType.DEFAULT),
        true
    );
    Reporter.report(new Report([''], MessageType.DEFAULT));
};
