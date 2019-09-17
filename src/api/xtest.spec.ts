import * as sinon from 'sinon';
import * as _ from 'lodash';
import { Counter } from '../counter';

describe('Core', () => {
    let mockBodyFunction: sinon.SinonSpy;

    let ignorecountSpy: sinon.SinonSpy;
    let testcountSpy: sinon.SinonSpy;

    beforeAll(() => {
        testcountSpy = sinon.spy(Counter, 'incrementTestCount');
        mockBodyFunction = sinon.stub();
    });

    beforeEach(() => {
        testcountSpy.resetHistory();
        mockBodyFunction.resetHistory();
    });

    describe('xtest', () => {
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
});
