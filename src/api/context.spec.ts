const sinon = require('sinon');
import * as _ from 'lodash';

import Reporter from '../reporter/Reporter';
import HooksManager from '../hooks/HookManager';
import { Counter } from '../counter';
import ContextChain from '../context-chain/ContextChain';
import { context } from './context';
import Report from '../reporter/Report';
import MessageType from '../messages/MessageType';

describe('context', () => {
    let mockContext: any;
    let reportSpy: sinon.SinonSpy;
    let mockBodyFunction: sinon.SinonSpy;
    let runSingleHookSpy: sinon.SinonSpy;
    let removeSingleHookSpy: sinon.SinonSpy;
    let incrementDepthSpy: sinon.SinonSpy;
    let decrementDepthSpy: sinon.SinonSpy;
    let pushContextChainSpy: sinon.SinonSpy;
    let popContextChainSpy: sinon.SinonSpy;

    beforeAll(() => {
        reportSpy = sinon.stub(Reporter, 'report');
        mockBodyFunction = sinon.stub();
        runSingleHookSpy = sinon.spy(HooksManager, 'runHook');
        removeSingleHookSpy = sinon.spy(HooksManager, 'removeHook');
        incrementDepthSpy = sinon.spy(Counter, 'incrementDepth');
        decrementDepthSpy = sinon.spy(Counter, 'decrementDepth');
        pushContextChainSpy = sinon.spy(ContextChain, 'push');
        popContextChainSpy = sinon.spy(ContextChain, 'pop');
    });

    beforeEach(() => {
        reportSpy.resetHistory();
        mockBodyFunction.resetHistory();
        runSingleHookSpy.resetHistory();
        removeSingleHookSpy.resetHistory();
        Counter.reset();
        incrementDepthSpy.resetHistory();
        decrementDepthSpy.resetHistory();
        pushContextChainSpy.resetHistory();
        popContextChainSpy.resetHistory();

        mockContext = context('Context description', mockBodyFunction);
    });

    afterAll(() => {
        reportSpy.restore();
        runSingleHookSpy.restore();
        removeSingleHookSpy.restore();
        incrementDepthSpy.restore();
        decrementDepthSpy.restore();
        pushContextChainSpy.restore();
        popContextChainSpy.restore();
    });

    it('prints its description', () => {
        sinon.assert.calledWith(
            reportSpy,
            new Report('Context description', MessageType.ROOT)
        );
    });

    it('should increment and decrement depth', () => {
        sinon.assert.calledOnce(incrementDepthSpy);
        sinon.assert.calledOnce(decrementDepthSpy);
        expect(Counter.depth).toEqual(0);
    });

    it('should run its body', () => {
        sinon.assert.calledOnce(mockBodyFunction);
    });

    it('should add the description to the CurrentContext chain', () => {
        sinon.assert.calledOnce(pushContextChainSpy);
        sinon.assert.calledWith(pushContextChainSpy, 'Context description');
    });

    it('should remove the description to the CurrentContext chain', () => {
        sinon.assert.calledOnce(popContextChainSpy);
    });

    it('should run tearDownHooks', () => {
        sinon.assert.calledOnce(runSingleHookSpy);
        sinon.assert.calledWith(runSingleHookSpy, 'tearDownHooks', 0);
    });

    it('should run removeHook three times', () => {
        sinon.assert.calledThrice(removeSingleHookSpy);
        sinon.assert.calledWith(removeSingleHookSpy, 'setupEachHooks', 0);
        sinon.assert.calledWith(removeSingleHookSpy, 'tearDownHooks', 0);
        sinon.assert.calledWith(
            removeSingleHookSpy,
            'tearDownEachHooks',
            0
        );
    });

    it('should clear the context chain', () => {
        expect(ContextChain.chain).toHaveLength(0);
    });

});
