import Reporter from '../reporter/Reporter';
import Report from '../reporter/Report';
import MessageType from '../messages/MessageType';
import { Counter } from '../counter';

export const xtest = (des: string, context: Function): void => {
    Counter.incrementIgnoreCount();
    Reporter.report(new Report(des, MessageType.IGNORED_TEST));
};
