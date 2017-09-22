import MessageType from './MessageType'

export default class Report {
    messages: Array<string>;
    messageType: MessageType;
    counter: number;

    constructor(messages: Array<string> | string, messageType: MessageType, counter: number) {
        typeof messages === 'string'
            ? this.messages = [messages]
            : this.messages = messages;
        this.messageType = messageType;
        this.counter = counter;
    }

}