import * as sinon from 'sinon';
import * as _ from 'lodash';

import ContextChain from '../context/ContextChain';
import { Counter } from '../counter';
import HooksManager from '../hooks/HookManager';

describe('Core', () => {
    let mockBodyFunction: sinon.SinonSpy;
    let runHooksSpy: sinon.SinonSpy;
    let testcountSpy: sinon.SinonSpy;

    beforeAll(() => {
        mockBodyFunction = sinon.stub();
    });

    beforeEach(() => {
        mockBodyFunction.resetHistory();
        runHooksSpy = sinon.spy(HooksManager, 'runHooks');
        testcountSpy = sinon.spy(Counter, 'incrementTestCount');
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
            expect(ContextChain.currentDescription).toEqual('Test description');
        });
    });
});
