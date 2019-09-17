import * as sinon from 'sinon';
import * as _ from 'lodash';

import { setupEach } from './setupEach';
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

    describe('setupEach', () => {
        let mockSetup: any;

        beforeEach(() => {
            mockSetup = setupEach(mockBodyFunction);
        });

        it('should run addHook', () => {
            sinon.assert.calledOnce(addSingleHookSpy);
            sinon.assert.calledWith(
                addSingleHookSpy,
                'setupEachHooks',
                mockBodyFunction
            );
        });
    });
});
