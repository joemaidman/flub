const sinon = require('sinon');

import { DefaultMessageStrategy } from '../messages/strategies/default-message-strategy';
import * as GetMessageStrategyParent from '../messages';
import Reporter from './reporter';
import Report from './report';
import MessageType from '../messages/message-type';

describe('Reporter', () => {
    let defaultMessageStrategy = new DefaultMessageStrategy();
    let getMessageStrategySpy: sinon.SinonStub;
    let printSpy: sinon.SinonStub;

    describe('WHEN report has been called', () => {
        beforeAll(() => {
            getMessageStrategySpy = sinon
                .stub(GetMessageStrategyParent, 'getMessageStrategy')
                .returns(defaultMessageStrategy);
            printSpy = sinon.stub(defaultMessageStrategy, 'print');
            Reporter.report(new Report('Test', MessageType.DEFAULT));
        });

        afterAll(() => {
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
