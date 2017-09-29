
import { OKMessageStrategy } from './../../src/models/MessageStrategies';
import { expect } from 'chai';
import * as sinon from 'sinon';

import Reporter from '../../src/models/Reporter'
import Report from '../../src/models/Report';
import MessageType from '../../src/models/MessageType'
import { DefaultMessageStrategy } from '../../src/models/MessageStrategies'
import { getMessageStrategy } from '../../src/models/MessageStrategies'
import * as GetMessageStrategyParent from '../../src/models/MessageStrategies'

describe('Reporter', () => {

    let defaultMessageStrategy = new DefaultMessageStrategy();
    let getMessageStrategySpy = sinon.stub(GetMessageStrategyParent, 'getMessageStrategy').returns(defaultMessageStrategy);
    let printSpy = sinon.spy(defaultMessageStrategy, 'print');

    describe('WHEN Reporter has been called', () => {
        it('THEN it always returns the same static instance', () => {
            const instanceA = Reporter.getInstance();
            const instanceB = Reporter.getInstance();
            expect(instanceA).to.equal(instanceB);
        });
    });

    describe('WHEN report has been called', () => {


        Reporter.getInstance().report(new Report('Test', MessageType.DEFAULT, 0));

        it('THEN getMessageStrategy will have been called', () => {
            sinon.assert.calledOnce(getMessageStrategySpy);
        });

        it('THEN print is called on a MessageStrategy', () => {
            sinon.assert.calledOnce(printSpy);
        });
    });

});