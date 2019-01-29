import { checkType } from '../utilities';

export function toBeLessThan(expected: any): boolean {
  checkType(['Number'], this.subject);
  this.expected = expected;
  this.failureDetails = ['Expected', this.subject, 'to be less than', this.expected];
  return this.assert(this.subject < this.expected);
}
