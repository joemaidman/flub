import { expect } from 'chai'

import { expect as expectBR } from '../../src/models/Core'
import Expectation from '../../src/models/Expectation'

describe('Core', () => {

    describe('GIVEN expect is called', () => {

        it('THEN it returns a new Expectation with a subject', () => {
            const assertion: Expectation = expectBR(1);
            expect(assertion).to.be.instanceof(Expectation);
            expect(assertion.subject).to.equal(1);
        })

        it('test an array', () => {
            expect('123').to.be.greaterThan(1);
        })

    });

});