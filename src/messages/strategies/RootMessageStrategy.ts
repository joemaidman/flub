import * as con from 'manakin';

import { MessageStrategy } from './MessageStrategy';
import MessageType from '../MessageType';
import { characters } from '../../resources/characters';

export class RootMessageStrategy extends MessageStrategy {

  constructor() {
      super(MessageType.ROOT);
  }

  print(messages: Array<string> | string, counter: number, stdout: any): void {
      typeof messages === 'string'
          ? messages = [messages]
          : messages = messages.map((message: string, index: number) => {
              return index === 0
                  ? characters.SPACE.repeat(counter * this.SPACES) + message
                  : message;
          });
      con.info.apply(con, messages);
  }

}