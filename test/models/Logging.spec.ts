import { expect } from 'chai';
import * as sinon from 'sinon';

import * as Logging from '../../src/models/Logging';
import Report from '../../src/models/Report'
import Reporter from '../../src/models/Reporter';
import MessageType from '../../src/models/MessageType';
import * as Counter from '../../src/models/Counter'

describe('Logging', () => {

    let reporterSpy: sinon.SinonStub;

    before(() => {
        reporterSpy = sinon.stub(Reporter, 'report').returns(true);
    });

    describe('WHEN printStartHeader is called', () => {
        before(() => {
            reporterSpy.reset();
            Logging.printStartHeader();
        });

        it('THEN it calls report on Reporter twice with the correct arguments', () => {
            sinon.assert.calledTwice(reporterSpy);
            sinon.assert.calledWith(reporterSpy, new Report('Bedrock starting...', MessageType.DEFAULT));
            sinon.assert.calledWith(reporterSpy, new Report('', MessageType.DEFAULT));
        });

    });

    describe('WHEN printReloadHeader is called', () => {
        before(() => {
            reporterSpy.reset();
            Logging.printReloadHeader();
        });

        it('THEN it calls report on Reporter thrice with the correct arguments', () => {
            sinon.assert.calledThrice(reporterSpy);
            sinon.assert.calledWith(reporterSpy, new Report('', MessageType.DEFAULT));
            sinon.assert.calledWith(reporterSpy, new Report('Bedrock reloading...', MessageType.DEFAULT));
            sinon.assert.calledWith(reporterSpy, new Report('', MessageType.DEFAULT));
        });

    });


    describe('WHEN printWatching is called', () => {
        before(() => {
            reporterSpy.reset();
            Logging.printWatching();
        });

        it('THEN it calls report on Reporter thrice with the correct arguments', () => {
            sinon.assert.calledThrice(reporterSpy);
            sinon.assert.calledWith(reporterSpy, new Report('', MessageType.DEFAULT));
            sinon.assert.calledWith(reporterSpy, new Report('Watching files...', MessageType.DEFAULT));
            sinon.assert.calledWith(reporterSpy, new Report('', MessageType.DEFAULT));
        });

    });

    describe('WHEN printTestSummary is called', () => {

        let testCountStub: sinon.SinonStub;
        let passCountStub: sinon.SinonStub;
        let failCountStub: sinon.SinonStub;

        before(() => {
            reporterSpy.reset();
            Counter.reset();
            let mockElapsed = {};
            mockElapsed['millisecondsTotal'] = 100;
            Logging.printTestSummary(mockElapsed);
        });

        it('THEN it calls report on Reporter thrice with the correct arguments', () => {
            expect(reporterSpy.callCount).to.equal(4);
            sinon.assert.calledWith(reporterSpy, new Report('', MessageType.DEFAULT));
            sinon.assert.calledWith(reporterSpy, new Report('Ran 0 tests in 100 ms', MessageType.DEFAULT));
            sinon.assert.calledWith(reporterSpy, new Report('0 passed', MessageType.OK));
            sinon.assert.calledWith(reporterSpy, new Report('0 failed', MessageType.ERROR));
        });

    });

    describe('WHEN printCaughtException is called', () => {
        before(() => {
            reporterSpy.reset();
            const mockError = new Error('Test error message');
            mockError.stack = "Test stack trace";
            Logging.printCaughtException(mockError);
        })

        it('THEN it calls report on Reporter once with the correct arguments', () => {
            sinon.assert.calledOnce(reporterSpy);
            sinon.assert.calledWithMatch(reporterSpy, new Report(['Test error message', 'Test stack trace'], MessageType.ERROR));
        });

    });


    after(() => {
        reporterSpy.restore();
    });

});