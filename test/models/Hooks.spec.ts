import { expect } from 'chai';
import * as sinon from 'sinon';

import { setupEach, spy } from './../../src/models/Core';
import Hooks from '../../src/models/Hooks';

describe('Hooks', () => {

    let hookSpy: sinon.SinonSpy;
    let mockHookList: Array<any>;
    let getHookSpy: sinon.SinonStub;
    let hooks: Hooks;

    before(() => {
        hookSpy = sinon.spy();
        mockHookList = [hookSpy];
        getHookSpy = sinon.stub(Hooks, 'getHooks').callsFake(() => { return mockHookList; });
    });

    after(() => {
        getHookSpy.restore();
    });

    describe('addHook', () => {

        it('should add the new hook to the array of hooks', () => {
            Hooks.addHook('setupEachHooks', hookSpy);
            expect(Hooks.getHooks('setupEachHooks')).to.contain(hookSpy);
        });

    });

    describe('runHook', () => {

        it('should run the hook', () => {
            Hooks.runHook('setupEachHooks', 0);
            sinon.assert.calledOnce(hookSpy);
        });

    });

    describe('removeHook', () => {

        it('should remove the hook at the given index', () => {
            Hooks.removeHook('setupEachHooks', 0);
            expect(Hooks.getHooks('setupEachHooks')).to.have.lengthOf(0);
        });

    });

});