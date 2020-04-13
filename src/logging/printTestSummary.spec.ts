const sinon = require('sinon');

import Report from '../reporter/Report';
import Reporter from '../reporter/Reporter';
import MessageType from '../messages/MessageType';
import { Counter } from '../counter';
import { printTestSummary } from './printTestSummary';

describe('printTestSummary', () => {
    let mockElapsed = {};
    let reporterSpy: sinon.SinonStub;

    beforeAll(() => {
        reporterSpy = sinon.stub(Reporter, 'report').returns();
    });

    beforeEach(() => {
        reporterSpy.reset();
        Counter.reset();
        mockElapsed['millisecondsTotal'] = 100;
    });

    describe('WHEN there are no ignored tests', () => {
        it('THEN it should call report on Reporter with the correct arguments', () => {
            printTestSummary(mockElapsed);
            expect(reporterSpy.callCount).toEqual(3);
            sinon.assert.calledWith(
                reporterSpy,
                new Report('', MessageType.DEFAULT)
            );
            sinon.assert.calledWith(
                reporterSpy,
                new Report('Ran 0 tests in 100 ms', MessageType.DEFAULT)
            );
            sinon.assert.calledWith(
                reporterSpy,
                new Report('0 passed', MessageType.OK)
            );
        });
    });

    describe('WHEN exactly one test ignored', () => {
        it('THEN it should call report on Reporter with the correct arguments', () => {
            Counter.incrementIgnoreCount();
            printTestSummary(mockElapsed);
            expect(reporterSpy.callCount).toEqual(4);
            sinon.assert.calledWith(
                reporterSpy,
                new Report('', MessageType.DEFAULT)
            );
            sinon.assert.calledWith(
                reporterSpy,
                new Report('Ran 0 tests in 100 ms', MessageType.DEFAULT)
            );
            sinon.assert.calledWith(
                reporterSpy,
                new Report('0 passed', MessageType.OK)
            );
            sinon.assert.calledWith(
                reporterSpy,
                new Report('1 ignored', MessageType.IGNORED_TEST)
            );
        });
    });

    describe('WHEN more than one test ignored', () => {
        it('THEN it should call report on Reporter with the correct arguments', () => {
            Counter.incrementIgnoreCount();
            Counter.incrementIgnoreCount();
            printTestSummary(mockElapsed);
            expect(reporterSpy.callCount).toEqual(4);
            sinon.assert.calledWith(
                reporterSpy,
                new Report('', MessageType.DEFAULT)
            );
            sinon.assert.calledWith(
                reporterSpy,
                new Report('Ran 0 tests in 100 ms', MessageType.DEFAULT)
            );
            sinon.assert.calledWith(
                reporterSpy,
                new Report('0 passed', MessageType.OK)
            );
            sinon.assert.calledWith(
                reporterSpy,
                new Report('2 ignored', MessageType.IGNORED_TEST)
            );
        });
    });

    describe('WHEN at least one test failed', () => {
        it('THEN it should call report on Reporter with the correct arguments', () => {
            Counter.incrementFailCount();
            printTestSummary(mockElapsed);
            expect(reporterSpy.callCount).toEqual(4);
            sinon.assert.calledWith(
                reporterSpy,
                new Report('', MessageType.DEFAULT)
            );
            sinon.assert.calledWith(
                reporterSpy,
                new Report('Ran 0 tests in 100 ms', MessageType.DEFAULT)
            );
            sinon.assert.calledWith(
                reporterSpy,
                new Report('0 passed', MessageType.OK)
            );
            sinon.assert.calledWith(
                reporterSpy,
                new Report('1 failed', MessageType.ERROR)
            );
        });
    });
});
