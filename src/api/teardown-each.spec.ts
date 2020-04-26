const sinon = require('sinon');
import * as _ from 'lodash';

import { teardownEach } from './teardown-each';
import HooksManager from '../hooks/hooks-manager';

describe('teardownEach', () => {
    let mockBodyFunction: sinon.SinonSpy;
    let addSingleHookSpy: sinon.SinonSpy;

    beforeAll(() => {
        mockBodyFunction = sinon.stub();
    });

    beforeEach(() => {
        mockBodyFunction.resetHistory();
        addSingleHookSpy = sinon.spy(HooksManager, 'addHook');
    });


    let mockTeardownEach: any;

    beforeEach(() => {
        mockTeardownEach = teardownEach(mockBodyFunction);
    });

    it('should run addHook', () => {
        sinon.assert.calledOnce(addSingleHookSpy);
        sinon.assert.calledWith(
            addSingleHookSpy,
            'teardownEachHooks',
            mockBodyFunction
        );
    });
});
