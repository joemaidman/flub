const sinon = require('sinon');
import * as _ from 'lodash';

import { tearDown } from './tearDown';
import HooksManager from '../hooks/HookManager';


let mockBodyFunction: sinon.SinonSpy;
let addSingleHookSpy: sinon.SinonSpy;

beforeAll(() => {
    mockBodyFunction = sinon.stub();
});

beforeEach(() => {
    mockBodyFunction.resetHistory();
    addSingleHookSpy = sinon.spy(HooksManager, 'addHook');
});

describe('tearDown', () => {
    let mockTearDown: any;

    beforeEach(() => {
        mockTearDown = tearDown(mockBodyFunction);
    });

    it('should run addHook', () => {
        sinon.assert.calledOnce(addSingleHookSpy);
        sinon.assert.calledWith(
            addSingleHookSpy,
            'tearDownHooks',
            mockBodyFunction
        );
    });
});

