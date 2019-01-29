import * as con from 'manakin';

import { MessageStrategy } from './MessageStrategy';
import MessageType from '../MessageType';
import { characters } from '../../resources/characters';

export class IgnoredContextMessageStrategy extends MessageStrategy {
        
  constructor() {
      super(MessageType.IGNOREDCONTEXT);
  }

  print(messages: Array<string> | string, counter: number, stdout: any): void {
      typeof messages === 'string' ?
          messages = [`${characters.SPACE.repeat(counter * this.SPACES)}${messages}`] :
          messages = messages.map((message: string, index: number) => {
              return index === 0
                  ? (`${characters.SPACE.repeat(counter * this.SPACES)}${message}`)
                  : message;
          });
      con.warn.apply(con, messages);
  }

}
