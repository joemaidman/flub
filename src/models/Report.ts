import MessageType from './MessageType'

export default class Report {
    messages: Array<string>;
    messageType: MessageType;

    constructor(messages: Array<string> | string, messageType: MessageType) {
        typeof messages === 'string'
            ? this.messages = [messages]
            : this.messages = messages;
        this.messageType = messageType;
    }

}