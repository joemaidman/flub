import Report from '../reporter/report';
import Reporter from '../reporter/reporter';
import MessageType from '../messages/message-type';

export const printCaughtException = (stack: string, message: string = '') => {
    Reporter.report(
        new Report(
            message === '' ? [stack || ''] : [message, stack || ''],
            MessageType.STACK
        )
    );
};
