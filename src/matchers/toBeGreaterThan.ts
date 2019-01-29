import { checkType } from '../utilities';

export function toBeGreaterThan(expected: any): boolean {
  checkType(['Number'], this.subject);
  this.expected = expected;
  this.failureDetails = ['Expected', this.subject, 'to be greater than', this.expected];
  return this.assert(this.subject > this.expected);
}