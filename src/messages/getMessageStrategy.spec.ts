import { getMessageStrategy } from './getMessageStrategy';
import MessageType from './MessageType';

describe('getMessageStrategy', () => {
    it('should return a message strategy of the correct type', () => {
        expect(getMessageStrategy(MessageType.COMPARISON).messageType).toEqual(
            MessageType.COMPARISON
        );
        expect(getMessageStrategy(MessageType.DEFAULT).messageType).toEqual(
            MessageType.DEFAULT
        );
        expect(getMessageStrategy(MessageType.ERROR).messageType).toEqual(
            MessageType.ERROR
        );
        expect(getMessageStrategy(MessageType.OK).messageType).toEqual(
            MessageType.OK
        );
        expect(getMessageStrategy(MessageType.ROOT).messageType).toEqual(
            MessageType.ROOT
        );
        expect(
            getMessageStrategy(MessageType.IGNORED_TEST).messageType
        ).toEqual(MessageType.IGNORED_TEST);
        expect(
            getMessageStrategy(MessageType.IGNORED_CONTEXT).messageType
        ).toEqual(MessageType.IGNORED_CONTEXT);
    });
});
