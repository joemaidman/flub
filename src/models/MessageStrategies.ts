import * as _ from 'lodash'
import * as con from 'manakin'

import MessageType from './MessageType'

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

export const loadMessageStrategies = (): Array<MessageStrategy> => {
    return Array<MessageStrategy>(
        new DefaultMessageStrategy(),
        new OKMessageStrategy(),
        new ErrorMessageStrategy(),
        new RootMessageStrategy(),
        new ComparisonMessageStrategy()
    );
}

export const getMessageStrategy = (messageType: MessageType): MessageStrategy => {
    return _.find(loadMessageStrategies(),
        (strategy: MessageStrategy) => {
            return strategy.handles(messageType) === true;
        }) || new DefaultMessageStrategy();
}

export class DefaultMessageStrategy extends MessageStrategy {

    constructor() {
        super(MessageType.DEFAULT);
    }

    print(messages: Array<string> | string, counter: number, stdout: any): void {

        typeof messages === 'string'
            ? messages = [messages]
            : messages = messages.map((message: string, index: number) => {
                return index === 0
                    ? ' '.repeat(counter * this.SPACES) + message
                    : message;
            });
        con.log.apply(con, messages);
    }

}

export class ErrorMessageStrategy extends MessageStrategy {

    constructor() {
        super(MessageType.ERROR);
    }

    print(messages: Array<string> | string, counter: number, stdout: any): void {
        typeof messages === 'string' ?
            messages = ['\u2717 ' + ' '.repeat(counter * this.SPACES) + messages] :
            messages = messages.map((message: string, index: number) => {
                return index === 0
                    ? (' '.repeat(counter * this.SPACES) + '\u2717 ' + message)
                    : message
            });
        con.error.apply(con, messages);
    }

}

export class OKMessageStrategy extends MessageStrategy {

    constructor() {
        super(MessageType.OK);
    }

    print(messages: Array<string> | string, counter: number, stdout: any): void {
        typeof messages === 'string' ?
            messages = ['\u2714 ' + ' '.repeat(counter * this.SPACES) + messages] :
            messages = messages.map((message: string, index: number) => {
                return index === 0
                    ? (' '.repeat(counter * this.SPACES) + '\u2714 ' + message)
                    : message
            });
        con.success.apply(con, messages);
    }

}

export class RootMessageStrategy extends MessageStrategy {

    constructor() {
        super(MessageType.ROOT);
    }

    print(messages: Array<string> | string, counter: number, stdout: any): void {
        typeof messages === 'string'
            ? messages = [messages]
            : messages = messages.map((message: string, index: number) => {
                return index === 0
                    ? ' '.repeat(counter * this.SPACES) + message
                    : message;
            });
        con.info.apply(con, messages);
    }

}

export class ComparisonMessageStrategy extends MessageStrategy {

    constructor() {
        super(MessageType.COMPARISON);
    }

    print(messages: Array<string> | string, counter: number, stdout: any): void {
        typeof messages === 'string'
            ? messages = [messages]
            : messages = messages.map((message: string, index: number) => {
                return index === 0
                    ? ' '.repeat(counter * this.SPACES) + message
                    : message;
            });
        con.error.apply(con, messages);
    }

}