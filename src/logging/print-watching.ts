import Reporter from '../reporter/reporter';
import Report from '../reporter/report';
import MessageType from '../messages/message-type';

export const printWatching = () => {
    Reporter.report(new Report('', MessageType.DEFAULT));
    Reporter.report(new Report('Watching files...', MessageType.DEFAULT), true);
    Reporter.report(new Report('', MessageType.DEFAULT));
};
