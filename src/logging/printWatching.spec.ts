const sinon = require('sinon');

import Report from '../reporter/Report';
import Reporter from '../reporter/Reporter';
import MessageType from '../messages/MessageType';
import { printWatching } from './printWatching';

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
