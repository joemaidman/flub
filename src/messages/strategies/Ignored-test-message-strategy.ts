import * as con from 'manakin';

import { MessageStrategy } from './message-strategy';
import MessageType from '../message-type';
import { characters } from '../../resources/characters';

export class IgnoredTestMessageStrategy extends MessageStrategy {
    constructor() {
        super(MessageType.IGNORED_TEST);
    }

    print(
        messages: Array<string> | string,
        counter: number,
        stdout: any
    ): void {
        typeof messages === 'string'
            ? (messages = [
                `${characters.DASH}${characters.SPACE.repeat(
                    counter * this.SPACES
                )}${messages}`,
            ])
            : (messages = messages.map((message: string, index: number) => {
                return index === 0
                    ? `${characters.SPACE.repeat(counter * this.SPACES)}${
                    characters.DASH
                    }${characters.SPACE}${message}`
                    : message;
            }));
        con.warn.apply(con, messages);
    }
}
