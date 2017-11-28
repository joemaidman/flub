import { expect } from 'chai';
import * as sinon from 'sinon';

import * as Logging from '../../src/models/Logging';
import Report from '../../src/models/Report';
import Reporter from '../../src/models/Reporter';
import MessageType from '../../src/models/MessageType';
import * as Counter from '../../src/models/Counter';
import { context } from '../../src/index';
import { FailureReport } from '../../src/models/FailureReport';

describe('Logging', () => {

    let reporterSpy: sinon.SinonStub;

    before(() => {
        reporterSpy = sinon.stub(Reporter, 'report').returns(true);
    });

    describe('printStartHeader', () => {
        before(() => {
            reporterSpy.reset();
            Logging.printStartHeader();
        });

        it('should call report on Reporter twice with the correct arguments', () => {
            sinon.assert.calledTwice(reporterSpy);
            sinon.assert.calledWith(reporterSpy, new Report('Bedrock starting...', MessageType.DEFAULT));
            sinon.assert.calledWith(reporterSpy, new Report('', MessageType.DEFAULT));
        });

    });

    describe('printReloadHeader', () => {
        before(() => {
            reporterSpy.reset();
            Logging.printReloadHeader();
        });

        it('should call report on Reporter thrice with the correct arguments', () => {
            sinon.assert.calledThrice(reporterSpy);
            sinon.assert.calledWith(reporterSpy, new Report('', MessageType.DEFAULT));
            sinon.assert.calledWith(reporterSpy, new Report('Bedrock reloading...', MessageType.DEFAULT));
            sinon.assert.calledWith(reporterSpy, new Report('', MessageType.DEFAULT));
        });

    });


    describe('printWatching', () => {
        before(() => {
            reporterSpy.reset();
            Logging.printWatching();
        });

        it('should call report on Reporter thrice with the correct arguments', () => {
            sinon.assert.calledThrice(reporterSpy);
            sinon.assert.calledWith(reporterSpy, new Report('', MessageType.DEFAULT));
            sinon.assert.calledWith(reporterSpy, new Report('Watching files...', MessageType.DEFAULT));
            sinon.assert.calledWith(reporterSpy, new Report('', MessageType.DEFAULT));
        });

    });

    describe('GIVEN printTestSummary', () => {

        let testCountStub: sinon.SinonStub;
        let passCountStub: sinon.SinonStub;
        let failCountStub: sinon.SinonStub;
        let mockElapsed = {};

        beforeEach(() => {
            reporterSpy.reset();
            Counter.reset();
            mockElapsed['millisecondsTotal'] = 100;
        });

        describe('WHEN there are no ignored tests', () => {

            it('THEN it should call report on Reporter four times with the correct arguments', () => {
                Logging.printTestSummary(mockElapsed);
                expect(reporterSpy.callCount).to.equal(4);
                sinon.assert.calledWith(reporterSpy, new Report('', MessageType.DEFAULT));
                sinon.assert.calledWith(reporterSpy, new Report('Ran 0 tests in 100 ms', MessageType.DEFAULT));
                sinon.assert.calledWith(reporterSpy, new Report('0 passed', MessageType.OK));
                sinon.assert.calledWith(reporterSpy, new Report('0 failed', MessageType.ERROR));
            });

        });

        describe('WHEN exactly one test ignored', () => {

            it('THEN it should call report on Reporter five times with the correct arguments', () => {
                Counter.incrementIgnoreCount();
                Logging.printTestSummary(mockElapsed);
                expect(reporterSpy.callCount).to.equal(5);
                sinon.assert.calledWith(reporterSpy, new Report('', MessageType.DEFAULT));
                sinon.assert.calledWith(reporterSpy, new Report('Ran 0 tests in 100 ms', MessageType.DEFAULT));
                sinon.assert.calledWith(reporterSpy, new Report('0 passed', MessageType.OK));
                sinon.assert.calledWith(reporterSpy, new Report('0 failed', MessageType.ERROR));
                sinon.assert.calledWith(reporterSpy, new Report('1 ignored', MessageType.IGNOREDTEST));
            });

        });

        describe('WHEN more than one test ignored', () => {

            it('THEN it should call report on Reporter five times with the correct arguments', () => {
                Counter.incrementIgnoreCount();
                Counter.incrementIgnoreCount();
                Logging.printTestSummary(mockElapsed);
                expect(reporterSpy.callCount).to.equal(5);
                sinon.assert.calledWith(reporterSpy, new Report('', MessageType.DEFAULT));
                sinon.assert.calledWith(reporterSpy, new Report('Ran 0 tests in 100 ms', MessageType.DEFAULT));
                sinon.assert.calledWith(reporterSpy, new Report('0 passed', MessageType.OK));
                sinon.assert.calledWith(reporterSpy, new Report('0 failed', MessageType.ERROR));
                sinon.assert.calledWith(reporterSpy, new Report('2 ignored', MessageType.IGNOREDTEST));
            });

        });

    });

    describe('printCaughtException', () => {
        const mockError: Error = new Error('Test error message');

        beforeEach(() => {
            reporterSpy.reset();
        });

        it('should call report on Reporter once with the correct arguments when no message is passed', () => {
            mockError.stack = 'Test stack trace';
            Logging.printCaughtException(mockError.stack);
            sinon.assert.calledOnce(reporterSpy);
            sinon.assert.calledWithMatch(reporterSpy, new Report(['Test stack trace'], MessageType.STACK));
        });

        it('should call report on Reporter once with the correct arguments when a message is passed', () => {
            mockError.stack = 'Test stack trace';
            Logging.printCaughtException(mockError.stack, mockError.message);
            sinon.assert.calledOnce(reporterSpy);
            sinon.assert.calledWithMatch(reporterSpy, new Report(['Test error message', 'Test stack trace'], MessageType.STACK));
        });

    });

    describe('printFailures', () => {
        const mockFailures: Array<FailureReport> = new Array<FailureReport>();
        const mockFailure: FailureReport = new FailureReport(
            'Description',
            'Chain',
            'Type',
            [new Report(
                'Report message',
                MessageType.ERROR,
                false)
            ],
            'Trace'
        );
        mockFailures.push(mockFailure);

        beforeEach(() => {
            reporterSpy.reset();
        });

        it('should call report on Reporter six times with the correct arguments ', () => {
            Logging.printFailures(mockFailures);
            sinon.assert.callCount(reporterSpy, 6);
            sinon.assert.calledWithMatch(reporterSpy, new Report(' ', MessageType.DEFAULT));
            sinon.assert.calledWithMatch(reporterSpy, new Report('Test Failures:', MessageType.ROOT));
            sinon.assert.calledWithMatch(reporterSpy, new Report(' ', MessageType.DEFAULT));
            sinon.assert.calledWithMatch(reporterSpy, new Report('Chain', MessageType.DEFAULT));
            sinon.assert.calledWithMatch(reporterSpy, new Report('Report message', MessageType.ERROR, true));
            sinon.assert.calledWithMatch(reporterSpy, new Report('Trace', MessageType.STACK));

        });

    });

    after(() => {
        reporterSpy.restore();
    });

});