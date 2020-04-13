const sinon = require('sinon');

import { FailureReport } from '../reporter/FailureReport';
import Report from '../reporter/Report';
import MessageType from '../messages/MessageType';
import { printFailures } from './printFailures';
import Reporter from '../reporter/Reporter';

describe('printFailures', () => {
    let reporterSpy: sinon.SinonStub;
    const mockFailures: Array<FailureReport> = new Array<FailureReport>();
    const mockFailure: FailureReport = new FailureReport(
        'Description',
        'Chain',
        'Type',
        [new Report('Report message', MessageType.ERROR, false)],
        'Trace'
    );
    mockFailures.push(mockFailure);

    beforeAll(() => {
        reporterSpy = sinon.stub(Reporter, 'report').returns();
    });

    beforeEach(() => {
        reporterSpy.reset();
    });

    it('should call report on Reporter with the correct arguments ', () => {
        printFailures(mockFailures);
        sinon.assert.callCount(reporterSpy, 6);
        sinon.assert.calledWithMatch(
            reporterSpy,
            new Report(' ', MessageType.DEFAULT)
        );
        sinon.assert.calledWithMatch(
            reporterSpy,
            new Report('Test Failures:', MessageType.ROOT)
        );
        sinon.assert.calledWithMatch(
            reporterSpy,
            new Report(' ', MessageType.DEFAULT)
        );
        sinon.assert.calledWithMatch(
            reporterSpy,
            new Report('Chain', MessageType.DEFAULT)
        );
        sinon.assert.calledWithMatch(
            reporterSpy,
            new Report('Report message', MessageType.ERROR, true)
        );
        sinon.assert.calledWithMatch(
            reporterSpy,
            new Report('Trace', MessageType.STACK)
        );
    });
});
