import MessageType from '../messages/MessageType';

export default class Report {
    messages: Array<string>;
    messageType: MessageType;
    indent: boolean;

    constructor(
        messages: Array<string> | string,
        messageType: MessageType,
        indent: boolean = false
    ) {
        typeof messages === 'string'
            ? (this.messages = [messages])
            : (this.messages = messages);
        this.messageType = messageType;
        this.indent = indent;
    }
}
