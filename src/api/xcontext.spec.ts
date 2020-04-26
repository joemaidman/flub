const sinon = require('sinon');
import * as _ from 'lodash';

import Reporter from '../reporter/reporter';
import HooksManager from '../hooks/hooks-manager';
import { Counter } from '../counter';
import ContextChain from '../context-chain/context-chain';
import { xcontext } from './xcontext';
import Report from '../reporter/report';
import MessageType from '../messages/message-type';

describe('xcontext', () => {
    let mockContext: any;
    let reportSpy: sinon.SinonSpy;
    let mockBodyFunction: sinon.SinonSpy;
    let runSingleHookSpy: sinon.SinonSpy;
    let removeSingleHookSpy: sinon.SinonSpy;
    let incrementDepthSpy: sinon.SinonSpy;
    let decrementDepthSpy: sinon.SinonSpy;
    let pushContextChainSpy: sinon.SinonSpy;
    let popContextChainSpy: sinon.SinonSpy;
    let toggleCurrentContextIgnoredSpy: sinon.SinonSpy;

    beforeAll(() => {
        reportSpy = sinon.stub(Reporter, 'report');
        mockBodyFunction = sinon.stub();
        runSingleHookSpy = sinon.spy(HooksManager, 'runHook');
        removeSingleHookSpy = sinon.spy(HooksManager, 'removeHook');
        incrementDepthSpy = sinon.spy(Counter, 'incrementDepth');
        decrementDepthSpy = sinon.spy(Counter, 'decrementDepth');
        pushContextChainSpy = sinon.spy(ContextChain, 'push');
        popContextChainSpy = sinon.spy(ContextChain, 'pop');
        toggleCurrentContextIgnoredSpy = sinon.spy(ContextChain, 'toggleCurrentContextIgnored');
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
        toggleCurrentContextIgnoredSpy.resetHistory();

        mockContext = xcontext('Context description', mockBodyFunction);
    });

    afterAll(() => {
        reportSpy.restore();
        runSingleHookSpy.restore();
        removeSingleHookSpy.restore();
        incrementDepthSpy.restore();
        decrementDepthSpy.restore();
        pushContextChainSpy.restore();
        popContextChainSpy.restore();
        toggleCurrentContextIgnoredSpy.restore();
    });

    it('sets the current context ignored and then resets it', () => {
        sinon.assert.calledTwice(toggleCurrentContextIgnoredSpy);
    });

    it('prints its description', () => {
        sinon.assert.calledWith(
            reportSpy,
            new Report('Context description', MessageType.IGNORED_CONTEXT)
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

    it('should run teardownHooks', () => {
        sinon.assert.calledOnce(runSingleHookSpy);
        sinon.assert.calledWith(runSingleHookSpy, 'teardownHooks', 0);
    });

    it('should run removeHook three times', () => {
        sinon.assert.calledThrice(removeSingleHookSpy);
        sinon.assert.calledWith(removeSingleHookSpy, 'setupEachHooks', 0);
        sinon.assert.calledWith(removeSingleHookSpy, 'teardownHooks', 0);
        sinon.assert.calledWith(
            removeSingleHookSpy,
            'teardownEachHooks',
            0
        );
    });

    it('should clear the context chain', () => {
        expect(ContextChain.chain).toHaveLength(0);
    });

});
