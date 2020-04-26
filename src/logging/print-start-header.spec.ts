const sinon = require('sinon');

import Report from '../reporter/report';
import Reporter from '../reporter/reporter';
import { printStartHeader } from './print-start-header';
import MessageType from '../messages/message-type';

describe('printStartHeader', () => {
    let reporterSpy: sinon.SinonStub;
    beforeAll(() => {
        reporterSpy = sinon.stub(Reporter, 'report').returns();
    });

    beforeEach(() => {
        reporterSpy.reset();
        printStartHeader();
    });

    it('should call report on Reporter with the correct arguments', () => {
        sinon.assert.calledTwice(reporterSpy);
        sinon.assert.calledWith(
            reporterSpy,
            new Report('Flub running...', MessageType.DEFAULT)
        );
        sinon.assert.calledWith(
            reporterSpy,
            new Report('', MessageType.DEFAULT)
        );
    });
});
