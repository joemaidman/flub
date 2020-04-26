import Expectation from '../expectation/expectation';
import { Counter } from '../counter';
import Reporter from '../reporter/reporter';
import MessageType from '../messages/message-type';
import Report from '../reporter/report';
import { failureList } from '../reporter/failure-report';
import { assert } from './assert';
const sinon = require('sinon');

describe('assert', () => {
    let expectation: Expectation;
    let reporter: Reporter;
    let reportStub: sinon.SinonSpy;
    let reporters: Array<Reporter>;

    beforeAll(() => {
        // Stub supresses console log output during testing
        // Switch to spy for full logging
        reportStub = sinon.stub(Reporter, 'report');
    });

    afterAll(function () {
        reportStub.restore();
    });
    describe('WHEN called on a regular expectation', () => {
        describe('WHEN it is passed a true equalityTest', () => {
            let assertResult: boolean;

            beforeAll(() => {
                expectation = new Expectation(1, 'Description');
                Counter.reset();
                reportStub.resetHistory();
                assertResult = assert(true, expectation);
            });

            it('THEN it called the Reporter with its description and an OK status', () => {
                sinon.assert.calledOnce(reportStub);
                sinon.assert.calledWith(
                    reportStub,
                    new Report(['Description'], MessageType.OK)
                );
            });

            it('THEN it increments the passed test count', () => {
                expect(Counter.passCount).toEqual(1);
                expect(Counter.failCount).toEqual(0);
            });

            it('THEN it returns true', () => {
                expect(assertResult).toBeTruthy();
            });
        });

        describe('WHEN it is passed a false equalityTest', () => {
            let assertResult: boolean;

            beforeAll(() => {
                expectation = new Expectation(1, 'Description');
                Counter.reset();
                reportStub.resetHistory();
                failureList.length = 0;
                assertResult = assert(false, expectation);
            });

            it('THEN it called the Reporter with its description and an ERROR status', () => {
                sinon.assert.calledOnce(reportStub);
                sinon.assert.calledWith(
                    reportStub,
                    new Report(['Description'], MessageType.ERROR)
                );
            });

            it('THEN it increments the failed test count', () => {
                expect(Counter.failCount).toEqual(1);
                expect(Counter.passCount).toEqual(0);
            });

            it('THEN it populates the expectation failureMessages', () => {
                expect(expectation.failureMessages).toEqual([
                    new Report([], MessageType.COMPARISON),
                ]);
            });

            it('THEN it is added to the global failureList', () => {
                expect(failureList).toHaveLength(1);
            });

            it('THEN it returns false', () => {
                expect(assertResult).toBeFalsy();
            });
        });
    });

    describe('WHEN called on an inverted not expectation', () => {
        beforeAll(() => {
            expectation = new Expectation(1, 'Description');
            expectation.not = new Expectation(1, 'Description', true);
            sinon
                .stub(expectation.not, 'failureDetails')
                .returns(['1', '2', '3', '4']);
        });

        describe('WHEN it is passed a true equalityTest', () => {
            it('THEN it returns true', () => {
                expect(assert(false, expectation.not)).toBeTruthy();
            });
        });

        describe('WHEN it is passed a false equalityTest', () => {
            it('THEN it returns false', () => {
                expect(assert(true, expectation.not)).toBeFalsy();
            });

            it('THEN it inserts not into the expectation failureDetails', () => {
                expect(expectation.not.failureDetails[2]).toEqual(
                    'not undefined'
                );
            });
        });
    });
});
