import* as R from 'ramda';

import { checkType } from '../utilities';

export function toHaveBeenCalledWithFirst(...args: any[]): boolean {
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
      '] first but was called with',
      R.nth(0, this.subject.getCallHistory())
  ];

  return this.assert(
      R.equals(
          Array.prototype.slice.call(arguments),
          R.nth(0, this.subject.getCallHistory())
      ));
}
