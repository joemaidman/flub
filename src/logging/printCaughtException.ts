import Report from '../reporter/Report';
import Reporter from '../reporter/Reporter';
import MessageType from '../messages/MessageType';

export const printCaughtException = (stack: string, message: string = '') => {
    Reporter.report(
        new Report(
            message === '' ? [stack || ''] : [message, stack || ''],
            MessageType.STACK
        )
    );
};
