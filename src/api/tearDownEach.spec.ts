const sinon = require('sinon');
import * as _ from 'lodash';

import { tearDownEach } from './tearDownEach';
import HooksManager from '../hooks/HookManager';

describe('tearDownEach', () => {
    let mockBodyFunction: sinon.SinonSpy;
    let addSingleHookSpy: sinon.SinonSpy;

    beforeAll(() => {
        mockBodyFunction = sinon.stub();
    });

    beforeEach(() => {
        mockBodyFunction.resetHistory();
        addSingleHookSpy = sinon.spy(HooksManager, 'addHook');
    });


    let mockTearDownEach: any;

    beforeEach(() => {
        mockTearDownEach = tearDownEach(mockBodyFunction);
    });

    it('should run addHook', () => {
        sinon.assert.calledOnce(addSingleHookSpy);
        sinon.assert.calledWith(
            addSingleHookSpy,
            'tearDownEachHooks',
            mockBodyFunction
        );
    });
});
