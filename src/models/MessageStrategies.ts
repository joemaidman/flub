import * as _ from 'lodash'
import * as colors from 'chalk'

import MessageType from './MessageType'

export interface MessageStrategy {
    handles: (messageType: MessageType) => boolean;
    print: (message: string, counter: number, stdout: any) => void;
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

export class DefaultMessageStrategy implements MessageStrategy {

    messageType: MessageType;
    SPACES: number = 2;

    constructor() {
        this.messageType = MessageType.DEFAULT;
    }

    handles(messageType: MessageType): boolean {
        return this.messageType === messageType;
    }

    print(message: string, counter: number, stdout: any): void {
        stdout.log(colors.white(' '.repeat(counter * this.SPACES) + message));
    }

}

export class ErrorMessageStrategy implements MessageStrategy {

    messageType: MessageType;
    SPACES: number = 2;

    constructor() {
        this.messageType = MessageType.ERROR;
    }

    handles(messageType: MessageType): boolean {
        return this.messageType === messageType;
    }

    print(message: string, counter: number, stdout: any): void {
        stdout.log(colors.red(' '.repeat(counter * this.SPACES) + '\u2717 ' + message));
    }

}

export class OKMessageStrategy implements MessageStrategy {

    messageType: MessageType;
    SPACES: number = 2;

    constructor() {
        this.messageType = MessageType.OK;
    }

    handles(messageType: MessageType): boolean {
        return this.messageType === messageType;
    }

    print(message: string, counter: number, stdout: any): void {
        stdout.log(colors.green(' '.repeat(counter * this.SPACES) + '\u2714 ' + message));
    }

}

export class RootMessageStrategy implements MessageStrategy {

    messageType: MessageType;
    SPACES: number = 2;

    constructor() {
        this.messageType = MessageType.ROOT;
    }

    handles(messageType: MessageType): boolean {
        return this.messageType === messageType;
    }

    print(message: string, counter: number, stdout: any): void {
        stdout.log(colors.blue(' '.repeat(counter * this.SPACES) + message));
    }

}

export class ComparisonMessageStrategy implements MessageStrategy {

    messageType: MessageType;
    SPACES: number = 2;

    constructor() {
        this.messageType = MessageType.COMPARISON;
    }

    handles(messageType: MessageType): boolean {
        return this.messageType === messageType;
    }

    print(message: string, counter: number, stdout: any): void {
        stdout.log(colors.red(' '.repeat(counter * this.SPACES) + message));
    }

}