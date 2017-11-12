import { expect } from 'chai';
import * as sinon from 'sinon';

import * as Counter from '../../src/models/Counter';

describe('Counter', () => {

    before(() => {
        Counter.reset();
    });

    describe('GIVEN Counter has been called', () => {

        describe('WHEN incrementDepth has been called', () => {
            it('THEN the depth increases by 1', () => {
                Counter.incrementDepth();
                expect(Counter.depth).to.eq(1);
            });
        });

        describe('WHEN decrementDepth has been called', () => {

            it('THEN the depth decreases by 1', () => {
                Counter.decrementDepth();
                expect(Counter.depth).to.eq(0);
            });
        });

        describe('WHEN incrementTestCount has been called', () => {

            it('THEN the testCount increases by 1', () => {
                Counter.incrementTestCount();
                expect(Counter.testCount).to.eq(1);
            });
        });

        describe('WHEN incrementPassCount has been called', () => {

            it('THEN the passCount increases by 1', () => {
                Counter.incrementPassCount();
                expect(Counter.passCount).to.eq(1);
            });
        });

        describe('WHEN incrementFailCount has been called', () => {

            it('THEN the failCount increases by 1', () => {
                Counter.incrementFailCount();
                expect(Counter.failCount).to.eq(1);
            });
        });

        describe('WHEN reset has been called', () => {

            it('THEN all counts reset to 0', () => {
                Counter.reset();
                expect(Counter.testCount).to.equal(0);
                expect(Counter.passCount).to.equal(0);
                expect(Counter.failCount).to.equal(0);
            });
        });



    });


});