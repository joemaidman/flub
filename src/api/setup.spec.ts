import * as sinon from 'sinon';
import * as _ from 'lodash';

import { setup } from './setup';

describe('Core', () => {
    let mockBodyFunction: sinon.SinonSpy;
    beforeAll(() => {
        mockBodyFunction = sinon.stub();
    });

    beforeEach(() => {
        mockBodyFunction.resetHistory();
    });

    describe('setup', () => {
        let mockSetup: any;

        beforeEach(() => {
            mockSetup = setup(mockBodyFunction);
        });

        it('should run its body', () => {
            sinon.assert.calledOnce(mockBodyFunction);
        });
    });
});
