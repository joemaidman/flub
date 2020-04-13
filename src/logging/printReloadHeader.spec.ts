const sinon = require('sinon');

import { printReloadHeader } from './printReloadHeader';
import Reporter from '../reporter/Reporter';
import Report from '../reporter/Report';
import MessageType from '../messages/MessageType';

describe('printReloadHeader', () => {
    let reporterSpy: sinon.SinonStub;
    beforeAll(() => {
        reporterSpy = sinon.stub(Reporter, 'report').returns();
    });
    beforeEach(() => {
        reporterSpy.reset();
        printReloadHeader();
    });

    it('should call report on Reporter with the correct arguments', () => {
        sinon.assert.calledThrice(reporterSpy);
        sinon.assert.calledWith(
            reporterSpy,
            new Report('', MessageType.DEFAULT)
        );
        sinon.assert.calledWith(
            reporterSpy,
            new Report('Bedrock reloading...', MessageType.DEFAULT)
        );
        sinon.assert.calledWith(
            reporterSpy,
            new Report('', MessageType.DEFAULT)
        );
    });
});
