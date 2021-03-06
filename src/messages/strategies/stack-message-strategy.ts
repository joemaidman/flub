import * as con from 'manakin';

import { MessageStrategy } from './message-strategy';
import MessageType from '../message-type';
import { characters } from '../../resources/characters';

export class StackMessageStrategy extends MessageStrategy {
    constructor() {
        super(MessageType.STACK);
    }

    print(
        messages: Array<string> | string,
        counter: number,
        stdout: any
    ): void {
        typeof messages === 'string'
            ? (messages = [messages])
            : (messages = messages.map((message: string, index: number) => {
                return index === 0
                    ? characters.SPACE.repeat(counter * this.SPACES) + message
                    : message;
            }));
        con.write(messages, 90);
    }
}
