import * as sinon from 'sinon';
import * as _ from 'lodash';

import { tearDownEach } from './tearDownEach';
import HooksManager from '../hooks/HookManager';

describe('Core', () => {
    let mockBodyFunction: sinon.SinonSpy;
    let addSingleHookSpy: sinon.SinonSpy;

    beforeAll(() => {
        mockBodyFunction = sinon.stub();
    });

    beforeEach(() => {
        mockBodyFunction.resetHistory();
        addSingleHookSpy = sinon.spy(HooksManager, 'addHook');
    });

    describe('tearDownEach', () => {
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
});
