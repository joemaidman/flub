import { expect } from 'chai';
import * as sinon from 'sinon';
import * as _ from 'lodash';

import { expect as expectBR } from '../../src/models/Core';
import { context, spy as spyBR, test, setup, setupEach, tearDown, tearDownEach } from '../../src/models/Core';
import Expectation from '../../src/models/Expectation';
import Spy from '../../src/models/Spy';
import Reporter from '../../src/models/Reporter';
import Report from '../../src/models/Report';
import MessageType from '../../src/models/MessageType';
import Counter from '../../src/models/Counter';
import Hooks from '../../src/models/Hooks'

describe('Core', () => {

    let reporter: Reporter;
    let reportStub: sinon.SinonSpy;
    let mockBodyFunction: sinon.SinonSpy;
    let runSingleHookSpy: sinon.SinonSpy;
    let runHooksSpy: sinon.SinonSpy;
    let removeSingleHookSpy: sinon.SinonSpy;
    let addSingleHookSpy: sinon.SinonSpy;

    before(() => {
        reporter = Reporter.getInstance();
        reportStub = sinon.stub(reporter, 'report');
        mockBodyFunction = sinon.stub();
        runHooksSpy = sinon.spy(Hooks, 'runHooks');
        runSingleHookSpy = sinon.spy(Hooks, 'runHook');
        removeSingleHookSpy = sinon.spy(Hooks, 'removeHook');
        addSingleHookSpy = sinon.spy(Hooks, 'addHook');
    })

    beforeEach(() => {
        reportStub.reset();
        mockBodyFunction.reset();
        runHooksSpy.reset();
        runSingleHookSpy.reset();
        removeSingleHookSpy.reset();
        addSingleHookSpy.reset();
    })

    after(() => {
        reportStub.restore();
        runHooksSpy.restore();
        runSingleHookSpy.restore();
        removeSingleHookSpy.restore();
    })

    describe('GIVEN expect is called', () => {
        const assertion: Expectation = expectBR(1);

        it('THEN it returns a new Expectation with a subject', () => {
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
            sinon.assert.calledWith(reportStub, new Report('Context description', MessageType.ROOT, 0));
        });

        it('THEN is increments and decrements depth', () => {
            expect(Counter.getDepth()).to.equal(0);
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

    describe('GIVEN test is called', () => {
        let mockTest: any;
        let testcountSpy: sinon.SinonSpy = sinon.spy(Counter, 'incrementTestCount')

        beforeEach(() => {
            testcountSpy.reset();
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