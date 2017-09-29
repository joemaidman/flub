import { setupEach } from './../../src/models/Core';
import { expect } from 'chai';
import * as sinon from 'sinon';

import Hooks from '../../src/models/Hooks'

describe('Hooks', () => {

    let hookSpy;
    let mockHookList;
    let getHookSpy;

    before(() => {
        hookSpy = sinon.spy();
        mockHookList = [hookSpy];
        getHookSpy = sinon.stub(Hooks, 'getHooks').callsFake(() => { return mockHookList });
    })


    describe('WHEN Hooks has been called', () => {

        it('THEN it always returns the same static instance', () => {
            const instanceA = Hooks.getInstance();
            const instanceB = Hooks.getInstance();
            expect(instanceA).to.equal(instanceB);
        });

    });

    describe('WHEN addHook has been called', () => {

        it('THEN the array of hooks contains the new hook', () => {
            Hooks.addHook('setupEachHooks', hookSpy);
            expect(Hooks.getHooks('setupEachHooks')).to.contain(hookSpy);
        });

    });

    describe('WHEN runHook is called', () => {

        it('THEN the hook is run', () => {
            Hooks.runHook('setupEachHooks', 0)
            sinon.assert.calledOnce(hookSpy);
        });

    });

    describe('WHEN removeHook has been called', () => {

        it('THEN the array of hooks does not contains the new hook', () => {
            Hooks.removeHook('setupEachHooks', 0)
            expect(Hooks.getHooks('setupEachHooks')).to.have.lengthOf(0);
        });

    });

});