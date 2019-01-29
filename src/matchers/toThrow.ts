import { checkType } from '../utilities';

export function toThrow(errorMessage: string): boolean {
  checkType(['Function'], this.subject);
  this.expected = errorMessage;
  let didThrow: boolean = false;
  let thrownMessage: string = '';
  try {

      this.throwsArgs
          ? this.subject(this.throwsArgs)
          : this.subject();
  }
  catch (e) {
      didThrow = true;
      thrownMessage = e.message || e;
  }

  if (didThrow) {
      this.failureDetails = [
          'Expected',
          this.subject,
          'to throw "',
          this.expected,
          '" but it threw "',
          thrownMessage, '"'
      ];
  }
  else {
      this.failureDetails = [
          'Expected',
          this.subject,
          'to throw "',
          this.expected,
          '" but it did not throw'
      ];
  }

  return this.assert(didThrow === true
      && thrownMessage === errorMessage);
}