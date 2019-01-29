import * as R from 'ramda';

import { checkType } from '../utilities';

export function toHaveBeenCalledWithLast(...args: any[]): boolean {
  checkType('Spy', this.subject);
  let argsArray: Array<string> = new Array<string>();
  for (let p in arguments) {
      if (arguments.hasOwnProperty(p)) {
          argsArray.push(arguments[p]);
      }
  }
  this.expected = arguments;
  this.failureDetails = [
      'Expected', 'spy',
      'to have been called with [',
      argsArray.join(', '),
      '] last but was called with',
      R.last(this.subject.getCallHistory())
  ];
  return this.assert(
      R.equals(
          Array.prototype.slice.call(arguments),
          R.last(this.subject.getCallHistory())
      ));
}
