const sinon = require('sinon');
import * as _ from 'lodash';

import ContextChain from '../context-chain/context-chain';
import { Counter } from '../counter';
import HooksManager from '../hooks/hooks-manager';
import { ftest } from '../api/ftest';

describe('ftest', () => {
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

    afterEach(() => {
        runHooksSpy.restore();
        testcountSpy.restore();
    });

    afterAll(() => {
        mockBodyFunction.restore();
    });

    let mockTest: any;

    beforeEach(() => {
        mockTest = ftest('Test description', mockBodyFunction);
    });

    it('should run setupEach and teardownEach hooks', () => {
        sinon.assert.calledTwice(runHooksSpy);
        sinon.assert.calledWith(runHooksSpy, 'setupEachHooks');
        sinon.assert.calledWith(runHooksSpy, 'teardownEachHooks');
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
