const sinon = require('sinon');
import * as _ from 'lodash';
import { Counter } from '../counter';
import { xtest } from './xtest';

describe('xtest', () => {
    let mockBodyFunction: sinon.SinonSpy;

    let ignorecountSpy: sinon.SinonSpy;
    let testcountSpy: sinon.SinonSpy;

    beforeAll(() => {
        testcountSpy = sinon.spy(Counter, 'incrementTestCount');
        ignorecountSpy = sinon.spy(Counter, 'incrementIgnoreCount');
        mockBodyFunction = sinon.stub();
    });

    beforeEach(() => {
        testcountSpy.resetHistory();
        ignorecountSpy.resetHistory();
        mockBodyFunction.resetHistory();
    });


    let mockTest: any;

    beforeEach(() => {
        mockTest = xtest('Test description', mockBodyFunction);
    });

    it('should not run the body or incrementTestCount but incrementIgnoreCount', () => {
        sinon.assert.notCalled(testcountSpy);
        sinon.assert.notCalled(mockBodyFunction);
        sinon.assert.calledOnce(ignorecountSpy);
    });

});
