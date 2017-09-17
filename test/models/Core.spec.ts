import { expect } from 'chai';
import * as sinon from 'sinon';

import { assert, context, it } from '../../src/models/Core'
import Assertion from '../../src/models/Assertion'

describe('Core', () => {

    describe('GIVEN assert is called', () => {

        it('THEN it returns a new Assertion with a subject', () => {
            const assertion: Assertion = assert(1);
            expect(assertion).to.be.instanceof(Assertion);
            expect(assertion.subject).to.equal(1);
        })

    });

});