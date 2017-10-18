
import { expect } from 'chai';
import * as sinon from 'sinon';

import {
    MessageStrategy,
    DefaultMessageStrategy,
    OKMessageStrategy,
    ErrorMessageStrategy,
    RootMessageStrategy,
    ComparisonMessageStrategy,
    loadMessageStrategies,
    getMessageStrategy
} from '../../src/models/MessageStrategies';
import MessageType from '../../src/models/MessageType';

describe("MessageStrategies", () => {

    describe('loadMessageStrategies', () => {

        it('should return an array of all message strategies', () => {
            expect(loadMessageStrategies()).to.have.length(6);
            expect(loadMessageStrategies()[0].constructor.name).to.equal('DefaultMessageStrategy');
            expect(loadMessageStrategies()[1].constructor.name).to.equal('OKMessageStrategy');
            expect(loadMessageStrategies()[2].constructor.name).to.equal('ErrorMessageStrategy');
            expect(loadMessageStrategies()[3].constructor.name).to.equal('RootMessageStrategy');
            expect(loadMessageStrategies()[4].constructor.name).to.equal('ComparisonMessageStrategy');
        });

    });

    describe('getMessageStrategy', () => {

        it('should return a message strategy of the correct type', () => {
            expect(getMessageStrategy(MessageType.COMPARISON).messageType).to.equal(MessageType.COMPARISON);
            expect(getMessageStrategy(MessageType.DEFAULT).messageType).to.equal(MessageType.DEFAULT);
            expect(getMessageStrategy(MessageType.ERROR).messageType).to.equal(MessageType.ERROR);
            expect(getMessageStrategy(MessageType.OK).messageType).to.equal(MessageType.OK);
            expect(getMessageStrategy(MessageType.ROOT).messageType).to.equal(MessageType.ROOT);
        });

    });

});