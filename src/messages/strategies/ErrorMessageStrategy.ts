import * as con from 'manakin';

import { MessageStrategy } from './MessageStrategy';
import MessageType from '../MessageType';
import { characters } from '../../resources/characters';

export class ErrorMessageStrategy extends MessageStrategy {
    constructor() {
        super(MessageType.ERROR);
    }

    print(
        messages: Array<string> | string,
        counter: number,
        stdout: any
    ): void {
        typeof messages === 'string'
            ? (messages = [
                  `${characters.CROSS}${characters.SPACE.repeat(
                      counter * this.SPACES + 1
                  )}${messages}`,
              ])
            : (messages = messages.map((message: string, index: number) => {
                  return index === 0
                      ? `${characters.SPACE.repeat(counter * this.SPACES)}${
                            characters.CROSS
                        }${characters.SPACE}${message}`
                      : message;
              }));
        con.error.apply(con, messages);
    }
}
