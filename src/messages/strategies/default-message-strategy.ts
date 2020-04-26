import * as con from 'manakin';

import MessageType from '../message-type';
import { MessageStrategy } from './message-strategy';
import { characters } from '../../resources/characters';

export class DefaultMessageStrategy extends MessageStrategy {
    constructor() {
        super(MessageType.DEFAULT);
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
                    ? `${characters.SPACE.repeat(
                        counter * this.SPACES
                    )}${message}`
                    : message;
            }));
        con.log.apply(con, messages);
    }
}
