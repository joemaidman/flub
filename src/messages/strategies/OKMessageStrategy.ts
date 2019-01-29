import * as con from 'manakin';

import MessageType from '../MessageType';
import { MessageStrategy } from './MessageStrategy';
import { characters } from '../../resources/characters';

export class OKMessageStrategy extends MessageStrategy {

    constructor() {
        super(MessageType.OK);
    }

    print(messages: Array<string> | string, counter: number, stdout: any): void {
        typeof messages === 'string' ?
            messages = [`${characters.TICK}${characters.SPACE.repeat(counter * this.SPACES + 1)}${messages}`] :
            messages = messages.map((message: string, index: number) => {
                return index === 0
                    ? (`${characters.SPACE.repeat(counter * this.SPACES)}${characters.TICK}${characters.SPACE}${message}`)
                    : message;
            });
        con.success.apply(con, messages);
    }

}