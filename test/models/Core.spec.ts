import { expect } from 'chai';
import * as sinon from 'sinon';
import * as _ from 'lodash';

import { expect as expectBR } from '../../src/models/Core';
import {
    context,
    xcontext,
    spy as spyBR,
    test,
    xtest,
    setup,
    setupEach,
    tearDown,
    tearDownEach,
    currentDescription,
    levelType
} from '../../src/models/Core';
import Expectation from '../../src/models/Expectation';
import Spy from '../../src/models/Spy';
import Reporter from '../../src/models/Reporter';
import Report from '../../src/models/Report';
import MessageType from '../../src/models/MessageType';
import * as Counter from '../../src/models/Counter';
import Hooks from '../../src/models/Hooks';
import ContextChain from '../../src/models/ContextChain';
import { testCount } from './../../src/models/Counter';

describe('Core', () => {

    let reporter: Reporter;
    let reportSpy: sinon.SinonSpy;
    let mockBodyFunction: sinon.SinonSpy;
    let runSingleHookSpy: sinon.SinonSpy;
    let runHooksSpy: sinon.SinonSpy;
    let removeSingleHookSpy: sinon.SinonSpy;
    let addSingleHookSpy: sinon.SinonSpy;
    let testcountSpy: sinon.SinonSpy;
    let ignorecountSpy: sinon.SinonSpy;
    let incrementDepthSpy: sinon.SinonSpy;
    let decrementDepthSpy: sinon.SinonSpy;
    let pushContextChainSpy: sinon.SinonSpy;
    let popContextChainSpy: sinon.SinonSpy;

    before(() => {
        reportSpy = sinon.stub(Reporter, 'report');
        mockBodyFunction = sinon.stub();
        runHooksSpy = sinon.spy(Hooks, 'runHooks');
        runSingleHookSpy = sinon.spy(Hooks, 'runHook');
        removeSingleHookSpy = sinon.spy(Hooks, 'removeHook');
        addSingleHookSpy = sinon.spy(Hooks, 'addHook');
        testcountSpy = sinon.spy(Counter, 'incrementTestCount');
        ignorecountSpy = sinon.spy(Counter, 'incrementIgnoreCount');
        incrementDepthSpy = sinon.spy(Counter, 'incrementDepth');
        decrementDepthSpy = sinon.spy(Counter, 'decrementDepth');
        pushContextChainSpy = sinon.spy(ContextChain, 'push');
        popContextChainSpy = sinon.spy(ContextChain, 'pop');

    });

    beforeEach(() => {
        reportSpy.reset();
        mockBodyFunction.reset();
        runHooksSpy.reset();
        runSingleHookSpy.reset();
        removeSingleHookSpy.reset();
        addSingleHookSpy.reset();
        testcountSpy.reset();
        ignorecountSpy.reset();
        Counter.reset();
        incrementDepthSpy.reset();
        decrementDepthSpy.reset();
        pushContextChainSpy.reset();
        popContextChainSpy.reset();
    });

    after(() => {
        reportSpy.restore();
        runHooksSpy.restore();
        runSingleHookSpy.restore();
        removeSingleHookSpy.restore();
        testcountSpy.restore();
        ignorecountSpy.restore();
        incrementDepthSpy.restore();
        decrementDepthSpy.restore();
        pushContextChainSpy.restore();
        popContextChainSpy.restore();
    });

    describe('expect', () => {
        const assertion: Expectation = expectBR(1);

        it('should return a new Expectation with the correct subject', () => {
            expect(assertion).to.be.instanceof(Expectation);
            expect(assertion.subject).to.equal(1);
        });

    });

    describe('context', () => {
        let mockContext: any;

        beforeEach(() => {
            mockContext = context('Context description', mockBodyFunction);
        });

        it('prints its description', () => {
            sinon.assert.calledWith(reportSpy, new Report('Context description', MessageType.ROOT));
        });

        it('should increment and decrement depth', () => {
            sinon.assert.calledOnce(incrementDepthSpy);
            sinon.assert.calledOnce(decrementDepthSpy);
            expect(Counter.depth).to.equal(0);
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
            sinon.assert.calledWith(removeSingleHookSpy, 'tearDownEachHooks', 0);

        });

        it('should clear the context chain', () => {
            expect(ContextChain.chain).to.be.empty;
        });

    });

    describe('test', () => {
        let mockTest: any;

        beforeEach(() => {
            mockTest = test('Test description', mockBodyFunction);
        });

        it('should run setupEach and tearDownEach hooks', () => {
            sinon.assert.calledTwice(runHooksSpy);
            sinon.assert.calledWith(runHooksSpy, 'setupEachHooks');
            sinon.assert.calledWith(runHooksSpy, 'tearDownEachHooks');
        });

        it('should run its body', () => {
            sinon.assert.calledOnce(mockBodyFunction);
        });

        it('should increment the test counter', () => {
            sinon.assert.calledOnce(testcountSpy);
        });

        it('should set the current description to the test description', () => {
            expect(currentDescription).to.equal('Test description');
        });

    });

    describe('xtest', () => {
        let mockTest: any;

        beforeEach(() => {
            mockTest = xtest('Test description', mockBodyFunction);
        });

        it('should not run the body or incrementTestCount but incrementIgnoreCount', () => {
            sinon.assert.notCalled(testcountSpy);
            sinon.assert.notCalled(mockBodyFunction);
            sinon.assert.calledOnce(ignorecountSpy);
        });

    });

    describe('setup', () => {

        let mockSetup: any;

        beforeEach(() => {
            mockSetup = setup(mockBodyFunction);
        });

        it('should run its body', () => {
            sinon.assert.calledOnce(mockBodyFunction);
        });

    });

    describe('setupEach', () => {

        let mockSetup: any;

        beforeEach(() => {
            mockSetup = setupEach(mockBodyFunction);
        });

        it('should run addHook', () => {
            sinon.assert.calledOnce(addSingleHookSpy);
            sinon.assert.calledWith(addSingleHookSpy, 'setupEachHooks', mockBodyFunction);
        });

    });

    describe('tearDown', () => {

        let mockTearDown: any;

        beforeEach(() => {
            mockTearDown = tearDown(mockBodyFunction);
        });

        it('should run addHook', () => {
            sinon.assert.calledOnce(addSingleHookSpy);
            sinon.assert.calledWith(addSingleHookSpy, 'tearDownHooks', mockBodyFunction);
        });

    });

    describe('tearDownEach', () => {

        let mockTearDownEach: any;

        beforeEach(() => {
            mockTearDownEach = tearDownEach(mockBodyFunction);
        });

        it('should run addHook', () => {
            sinon.assert.calledOnce(addSingleHookSpy);
            sinon.assert.calledWith(addSingleHookSpy, 'tearDownEachHooks', mockBodyFunction);
        });

    });

    describe('spy', () => {
        const spy: Spy = spyBR(Math, 'round');

        it('should return a spy object', () => {
            expect(spy).to.be.instanceof(Spy);
        });

    });
    
});