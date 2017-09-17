import { expect } from 'chai';
import * as sinon from 'sinon';

import Assertion from '../../src/models/Assertion'
import Reporter from '../../src/models/Reporter'

describe('Assertion', () => {

    let assertion: Assertion;
    let reporter: Reporter;
    let reportStub: sinon.SinonSpy;
    let reporters: Array<Reporter>;

    before(() => {
        reporter = Reporter.getInstance();
        reportStub = sinon.spy(reporter, 'report');
    })

    describe('Given a reporter is passed', () => {

        it('THEN it can call the reporter to report', () => {
            assertion = new Assertion(1, 0, 'Description');
            assertion.isEqual(1);
            sinon.assert.calledOnce(reportStub);
        })

    })


    describe('GIVEN isEqual is called', () => {

        describe('WHEN a true assertion is made', () => {

            it('THEN it evaluates to true', () => {
                assertion = new Assertion(1, 0, 'Description');
                expect(assertion.isEqual(1)).to.be.true;
            })

        });

        describe('WHEN a false assertion is made', () => {

            it('THEN it evaluates to false', () => {
                assertion = new Assertion(1, 0, 'Description');
                expect(assertion.isEqual(2)).to.be.false;
            })

        });

    });

    describe('GIVEN isEmptyString is called', () => {

        describe('WHEN a true assertion is made', () => {

            it('THEN it evaluates to true', () => {
                assertion = new Assertion('', 0, 'Description');
                expect(assertion.isEmptyString()).to.be.true;
            })

        });

        describe('WHEN a false assertion is made', () => {

            it('THEN it evaluates to false', () => {
                assertion = new Assertion('Not empty', 0, 'Description');
                expect(assertion.isEmptyString()).to.be.false;
            })

        });

    });

});