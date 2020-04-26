import Reporter from '../reporter/Reporter';
import Report from '../reporter/Report';
import MessageType from '../messages/MessageType';

export const printStartHeader = () => {
    Reporter.report(
        new Report('Flub running...', MessageType.DEFAULT),
        true
    );
    Reporter.report(new Report('', MessageType.DEFAULT));
};
