import MessageType from '../message-type';

export abstract class MessageStrategy {
    messageType: MessageType;
    SPACES: number = 2;

    constructor(messageType: MessageType) {
        this.messageType = messageType;
    }

    abstract print(messages: Array<string>, counter: number, stdout: any): void;

    handles(messageType: MessageType): boolean {
        return this.messageType === messageType;
    }
}
