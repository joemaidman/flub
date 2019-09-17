import * as sinon from 'sinon';
import * as _ from 'lodash';

import Reporter from '../reporter/Reporter';
import HooksManager from '../hooks/HookManager';
import { Counter } from '../counter';
import ContextChain from '../context/ContextChain';
import Report from '../reporter/Report';
import MessageType from '../messages/MessageType';
import Expectation from '../expectation/Expectation';
import { expect as expectBR } from './expect';
import { context } from './context';

describe('Core', () => {
    let reportSpy: sinon.SinonSpy;
    let mockBodyFunction: sinon.SinonSpy;
    let runSingleHookSpy: sinon.SinonSpy;
    let removeSingleHookSpy: sinon.SinonSpy;
    let ignorecountSpy: sinon.SinonSpy;
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

    describe('ftest', () => {
        // let mockTest: any;
        // beforeEach(() => {
        //     mockTest = test('Test description', mockBodyFunction);
        // });
        // it('should run setupEach and tearDownEach hooks', () => {
        //     sinon.assert.calledTwice(runHooksSpy);
        //     sinon.assert.calledWith(runHooksSpy, 'setupEachHooks');
        //     sinon.assert.calledWith(runHooksSpy, 'tearDownEachHooks');
        // });
        // it('should run its body', () => {
        //     sinon.assert.calledOnce(mockBodyFunction);
        // });
        // it('should increment the test counter', () => {
        //     sinon.assert.calledOnce(testcountSpy);
        // });
        // it('should set the current description to the test description', () => {
        //     expect(currentDescription).to.equal('Test description');
        // });
    });
});
