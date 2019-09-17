import * as sinon from 'sinon';

import Report from '../reporter/Report';
import Reporter from '../reporter/Reporter';
import { printStartHeader } from './printStartHeader';
import MessageType from '../messages/MessageType';

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
            new Report('Bedrock starting...', MessageType.DEFAULT)
        );
        sinon.assert.calledWith(
            reporterSpy,
            new Report('', MessageType.DEFAULT)
        );
    });
});
