const sinon = require('sinon');
import * as _ from 'lodash';

import { teardown } from './teardown';
import HooksManager from '../hooks/hooks-manager';


let mockBodyFunction: sinon.SinonSpy;
let addSingleHookSpy: sinon.SinonSpy;

beforeAll(() => {
    mockBodyFunction = sinon.stub();
});

beforeEach(() => {
    mockBodyFunction.resetHistory();
    addSingleHookSpy = sinon.spy(HooksManager, 'addHook');
});

describe('teardown', () => {
    let mockTeardown: any;

    beforeEach(() => {
        mockTeardown = teardown(mockBodyFunction);
    });

    it('should run addHook', () => {
        sinon.assert.calledOnce(addSingleHookSpy);
        sinon.assert.calledWith(
            addSingleHookSpy,
            'teardownHooks',
            mockBodyFunction
        );
    });
});

