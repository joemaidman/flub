import { testCount } from './../../src/models/Counter';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as _ from 'lodash';

import { expect as expectBR } from '../../src/models/Core';
import { context, xcontext, spy as spyBR, test, xtest, setup, setupEach, tearDown, tearDownEach } from '../../src/models/Core';
import Expectation from '../../src/models/Expectation';
import Spy from '../../src/models/Spy';
import Reporter from '../../src/models/Reporter';
import Report from '../../src/models/Report';
import MessageType from '../../src/models/MessageType';
import * as Counter from '../../src/models/Counter';
import Hooks from '../../src/models/Hooks'

describe('Core', () => {

    let reporter: Reporter;
    let reportStub: sinon.SinonSpy;
    let mockBodyFunction: sinon.SinonSpy;
    let runSingleHookSpy: sinon.SinonSpy;
    let runHooksSpy: sinon.SinonSpy;
    let removeSingleHookSpy: sinon.SinonSpy;
    let addSingleHookSpy: sinon.SinonSpy;
    let testcountSpy: sinon.SinonSpy;
    let incrementDepthSpy: sinon.SinonSpy;
    let decrementDepthSpy: sinon.SinonSpy;

    before(() => {
        reportStub = sinon.stub(Reporter, 'report');
        mockBodyFunction = sinon.stub();
        runHooksSpy = sinon.spy(Hooks, 'runHooks');
        runSingleHookSpy = sinon.spy(Hooks, 'runHook');
        removeSingleHookSpy = sinon.spy(Hooks, 'removeHook');
        addSingleHookSpy = sinon.spy(Hooks, 'addHook');
        testcountSpy = sinon.spy(Counter, 'incrementTestCount');
        incrementDepthSpy = sinon.spy(Counter, 'incrementDepth');
        decrementDepthSpy = sinon.spy(Counter, 'decrementDepth');

    })

    beforeEach(() => {
        reportStub.reset();
        mockBodyFunction.reset();
        runHooksSpy.reset();
        runSingleHookSpy.reset();
        removeSingleHookSpy.reset();
        addSingleHookSpy.reset();
        testcountSpy.reset();
        Counter.reset();
        incrementDepthSpy.reset();
        decrementDepthSpy.reset();
    })

    after(() => {
        reportStub.restore();
        runHooksSpy.restore();
        runSingleHookSpy.restore();
        removeSingleHookSpy.restore();
        testcountSpy.restore();
        incrementDepthSpy.restore();
        decrementDepthSpy.restore();
    })

    describe('GIVEN expect is called', () => {
        const assertion: Expectation = expectBR(1);

        it('THEN it returns a new Expectation', () => {
            expect(assertion).to.be.instanceof(Expectation);
        });

        it('THEN the returned Expectation has the correct subject', () => {
            expect(assertion.subject).to.equal(1);
        });
    });

    describe('GIVEN context is called', () => {
        let mockContext: any;

        beforeEach(() => {
            mockContext = context('Context description', mockBodyFunction);
        })

        it('THEN is prints its description', () => {
            sinon.assert.calledWith(reportStub, new Report('Context description', MessageType.ROOT));
        });

        it('THEN is increments and decrements depth', () => {
            sinon.assert.calledOnce(incrementDepthSpy);
            sinon.assert.calledOnce(decrementDepthSpy);
            expect(Counter.depth).to.equal(0);
        });

        it('THEN is runs its body', () => {
            sinon.assert.calledOnce(mockBodyFunction);
        });

        it('THEN is runs tearDownHooks', () => {
            sinon.assert.calledOnce(runSingleHookSpy);
            sinon.assert.calledWith(runSingleHookSpy, 'tearDownHooks', 0);
        });

        it('THEN is runs removeHook three times', () => {
            sinon.assert.calledThrice(removeSingleHookSpy);
            sinon.assert.calledWith(removeSingleHookSpy, 'setupEachHooks', 0);
            sinon.assert.calledWith(removeSingleHookSpy, 'tearDownHooks', 0);
            sinon.assert.calledWith(removeSingleHookSpy, 'tearDownEachHooks', 0);

        });

    });

    describe('GIVEN xcontext is called', () => {
        let mockContext: any;

        beforeEach(() => {
            mockContext = xcontext('Context description', mockBodyFunction);
        });

        it('THEN it does nothing', () => {
            sinon.assert.notCalled(mockBodyFunction);
        })

    });

    describe('GIVEN test is called', () => {
        let mockTest: any;

        beforeEach(() => {
            mockTest = test('Test description', mockBodyFunction);
        });

        it('THEN it runs setupEach and tearDownEach hooks', () => {
            sinon.assert.calledTwice(runHooksSpy);
            sinon.assert.calledWith(runHooksSpy, 'setupEachHooks');
            sinon.assert.calledWith(runHooksSpy, 'tearDownEachHooks');
        });

        it('THEN is runs its body', () => {
            sinon.assert.calledOnce(mockBodyFunction);
        });

        it('THEN it increments the test counter', () => {
            sinon.assert.calledOnce(testcountSpy);
        });

    });

    describe('GIVEN xtest is called', () => {
        let mockTest: any;

        beforeEach(() => {
            mockTest = xtest('Test description', mockBodyFunction);
        });

        it('THEN it does nothing', () => {
            sinon.assert.notCalled(testcountSpy);
            sinon.assert.notCalled(mockBodyFunction);
        })

    });

    describe('GIVEN setup is called', () => {

        let mockSetup: any;

        beforeEach(() => {
            mockSetup = setup(mockBodyFunction);
        });

        it('THEN is runs its body', () => {
            sinon.assert.calledOnce(mockBodyFunction);
        });

    });

    describe('GIVEN setupEach is called', () => {

        let mockSetup: any;

        beforeEach(() => {
            mockSetup = setupEach(mockBodyFunction);
        });

        it('THEN is runs addHook', () => {
            sinon.assert.calledOnce(addSingleHookSpy);
            sinon.assert.calledWith(addSingleHookSpy, 'setupEachHooks', mockBodyFunction)
        });

    });

    describe('GIVEN tearDown is called', () => {

        let mockTearDown: any;

        beforeEach(() => {
            mockTearDown = tearDown(mockBodyFunction);
        });

        it('THEN is runs addHook', () => {
            sinon.assert.calledOnce(addSingleHookSpy);
            sinon.assert.calledWith(addSingleHookSpy, 'tearDownHooks', mockBodyFunction)
        });

    });

    describe('GIVEN tearDownEach is called', () => {

        let mockTearDownEach: any;

        beforeEach(() => {
            mockTearDownEach = tearDownEach(mockBodyFunction);
        });

        it('THEN is runs addHook', () => {
            sinon.assert.calledOnce(addSingleHookSpy);
            sinon.assert.calledWith(addSingleHookSpy, 'tearDownEachHooks', mockBodyFunction)
        });

    });

    describe('GIVEN spy has been called', () => {
        const spy: Spy = spyBR(Math, 'round');

        it('THEN is returns a spy object', () => {
            expect(spy).to.be.instanceof(Spy);
        });

    });

});