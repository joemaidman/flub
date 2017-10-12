import { expect } from 'chai';
import * as sinon from 'sinon';

import Reporter from '../../src/models/Reporter'
import Report from '../../src/models/Report';
import MessageType from '../../src/models/MessageType'
import { MessageStrategy, DefaultMessageStrategy } from '../../src/models/MessageStrategies'
import { getMessageStrategy } from '../../src/models/MessageStrategies'
import * as GetMessageStrategyParent from '../../src/models/MessageStrategies'

describe('Reporter', () => {

    let defaultMessageStrategy = new DefaultMessageStrategy();
    let getMessageStrategySpy: sinon.SinonStub;
    let printSpy: sinon.SinonSpy;

    describe('WHEN report has been called', () => {

        before(() => {
            getMessageStrategySpy = sinon.stub(GetMessageStrategyParent, 'getMessageStrategy').returns(defaultMessageStrategy);
            printSpy = sinon.spy(defaultMessageStrategy, 'print');
            Reporter.report(new Report('Test', MessageType.DEFAULT));
        });

        after(() => {
            getMessageStrategySpy.restore();
            printSpy.restore();
        });

        it('THEN getMessageStrategy will have been called', () => {
            sinon.assert.calledOnce(getMessageStrategySpy);
        });

        it('THEN print is called on a MessageStrategy with the correct arguments', () => {
            sinon.assert.calledOnce(printSpy);
            sinon.assert.calledWith(printSpy, ['Test'], 0, console);
        });

    });

});