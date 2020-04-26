const sinon = require('sinon');

import Report from '../reporter/report';
import Reporter from '../reporter/reporter';
import MessageType from '../messages/message-type';
import { printWatching } from './print-watching';

describe('printWatching', () => {
    let reporterSpy: sinon.SinonStub;
    beforeAll(() => {
        reporterSpy = sinon.stub(Reporter, 'report').returns();
    });

    beforeAll(() => {
        reporterSpy.reset();
        printWatching();
    });

    it('should call report on Reporter with the correct arguments', () => {
        sinon.assert.calledThrice(reporterSpy);
        sinon.assert.calledWith(
            reporterSpy,
            new Report('', MessageType.DEFAULT)
        );
        sinon.assert.calledWith(
            reporterSpy,
            new Report('Watching files...', MessageType.DEFAULT)
        );
        sinon.assert.calledWith(
            reporterSpy,
            new Report('', MessageType.DEFAULT)
        );
    });
});
