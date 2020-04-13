import Reporter from '../reporter/Reporter';
import Report from '../reporter/Report';
import MessageType from '../messages/MessageType';

export const printWatching = () => {
    Reporter.report(new Report('', MessageType.DEFAULT));
    Reporter.report(new Report('Watching files...', MessageType.DEFAULT), true);
    Reporter.report(new Report('', MessageType.DEFAULT));
};
