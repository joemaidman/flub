const sinon = require('sinon');
import * as _ from 'lodash';

import { setup } from './setup';

describe('setup', () => {
    let mockBodyFunction: sinon.SinonSpy;
    beforeAll(() => {
        mockBodyFunction = sinon.stub();
    });

    beforeEach(() => {
        mockBodyFunction.resetHistory();
    });


    let mockSetup: any;

    beforeEach(() => {
        mockSetup = setup(mockBodyFunction);
    });

    it('should run its body', () => {
        sinon.assert.calledOnce(mockBodyFunction);
    });

});
