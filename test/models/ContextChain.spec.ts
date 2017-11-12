import { expect } from 'chai';
import * as sinon from 'sinon';

import ContextChain from '../../src/models/ContextChain';

describe('ContextChain', () => {

    before(() => {
        ContextChain.reset();
    });

    after(() => {
        ContextChain.reset();
    });

    it('should have a chain', () => {
        expect(ContextChain.chain).to.exist;
    });

    describe('push', () => {

        it('should add an item to the chain', () => {
            ContextChain.push('1');
            expect(ContextChain.chain).to.deep.equal(['1']);
        });

    });

    describe('pop', () => {

        it('should remove the last item from the chain', () => {
            ContextChain.pop();
            expect(ContextChain.chain).to.be.empty;
        });

    });


});