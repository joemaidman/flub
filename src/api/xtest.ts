import Reporter from '../reporter/reporter';
import Report from '../reporter/report';
import MessageType from '../messages/message-type';
import { Counter } from '../counter';

export const xtest = (des: string, context: Function): void => {
    Counter.incrementIgnoreCount();
    Reporter.report(new Report(des, MessageType.IGNORED_TEST));
};
