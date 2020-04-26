const sinon = require('sinon');
import * as _ from 'lodash';

import { setupEach } from './setup-each';
import HooksManager from '../hooks/hooks-manager';

describe('setupEach', () => {
    let mockBodyFunction: sinon.SinonSpy;
    let addSingleHookSpy: sinon.SinonSpy;
    beforeAll(() => {
        mockBodyFunction = sinon.stub();
    });

    beforeEach(() => {
        mockBodyFunction.resetHistory();
        addSingleHookSpy = sinon.spy(HooksManager, 'addHook');
    });


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
