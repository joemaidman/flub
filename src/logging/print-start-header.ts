import Reporter from '../reporter/reporter';
import Report from '../reporter/report';
import MessageType from '../messages/message-type';

export const printStartHeader = () => {
    Reporter.report(
        new Report('Flub running...', MessageType.DEFAULT),
        true
    );
    Reporter.report(new Report('', MessageType.DEFAULT));
};
