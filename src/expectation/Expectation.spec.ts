import { expect } from 'chai';
const sinon = require('sinon');

import Expectation from './expectation';
import Reporter from '../reporter/reporter';

describe('Expectation', () => {
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

    describe('Given a reporter is passed', () => {
        it('THEN it can call the reporter to report', () => {
            expectation = new Expectation(1, 'Description');
            expectation.toEqual(1);
            sinon.assert.calledOnce(reportStub);
        });
    });

    describe('GIVEN with', () => {
        it('should set throwsArgs property and returns the expectation object', () => {
            expectation = new Expectation(1, 'Description');
            const returnedExpectation: Expectation = expectation.with(1, 2, 3);
            expect(expectation.throwsArgs).to.deep.equal([1, 2, 3]);
            expect(returnedExpectation).to.equal(expectation);
        });
    });
});
