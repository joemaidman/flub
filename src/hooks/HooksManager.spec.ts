import { expect } from 'chai';
const sinon = require('sinon');

import HooksManager from './HookManager';

describe('HooksManager', () => {
    let hookSpy: sinon.SinonSpy;
    let mockHookList: Array<any>;
    let getHookSpy: sinon.SinonStub;

    beforeAll(() => {
        hookSpy = sinon.spy();
        mockHookList = [hookSpy];
        getHookSpy = sinon.stub(HooksManager, 'getHooks').callsFake(() => {
            return mockHookList;
        });
    });

    afterAll(() => {
        getHookSpy.restore();
    });

    describe('addHook', () => {
        it('should add the new hook to the array of hooks', () => {
            HooksManager.addHook('setupEachHooks', hookSpy);
            expect(HooksManager.getHooks('setupEachHooks')).to.contain(hookSpy);
        });
    });

    describe('runHook', () => {
        it('should run the hook', () => {
            HooksManager.runHook('setupEachHooks', 0);
            sinon.assert.calledOnce(hookSpy);
        });
    });

    describe('removeHook', () => {
        it('should remove the hook at the given index', () => {
            HooksManager.removeHook('setupEachHooks', 0);
            expect(HooksManager.getHooks('setupEachHooks')).to.have.lengthOf(0);
        });
    });
});
