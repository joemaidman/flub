const sinon = require('sinon');

import { printReloadHeader } from './print-reload-header';
import Reporter from '../reporter/reporter';
import Report from '../reporter/report';
import MessageType from '../messages/message-type';

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
            new Report('Flub reloading...', MessageType.DEFAULT)
        );
        sinon.assert.calledWith(
            reporterSpy,
            new Report('', MessageType.DEFAULT)
        );
    });
});
