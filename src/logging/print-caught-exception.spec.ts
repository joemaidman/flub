const sinon = require('sinon');

import { printCaughtException } from './print-caught-exception';
import MessageType from '../messages/message-type';
import Report from '../reporter/report';
import Reporter from '../reporter/reporter';

describe('printCaughtException', () => {
    const mockError: Error = new Error('Test error message');
    let reporterSpy: sinon.SinonStub;
    beforeAll(() => {
        reporterSpy = sinon.stub(Reporter, 'report').returns();
    });

    beforeEach(() => {
        reporterSpy.reset();
    });

    it('should call report on Reporter with the correct arguments when no message is passed', () => {
        mockError.stack = 'Test stack trace';
        printCaughtException(mockError.stack);
        sinon.assert.calledOnce(reporterSpy);
        sinon.assert.calledWithMatch(
            reporterSpy,
            new Report(['Test stack trace'], MessageType.STACK)
        );
    });

    it('should call report on Reporter with the correct arguments when a message is passed', () => {
        mockError.stack = 'Test stack trace';
        printCaughtException(mockError.stack, mockError.message);
        sinon.assert.calledOnce(reporterSpy);
        sinon.assert.calledWithMatch(
            reporterSpy,
            new Report(
                ['Test error message', 'Test stack trace'],
                MessageType.STACK
            )
        );
    });
});
