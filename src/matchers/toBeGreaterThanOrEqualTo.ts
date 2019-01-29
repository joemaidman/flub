import { checkType } from '../utilities';

export function toBeGreaterThanOrEqualTo (expected: number): boolean {
  checkType(['Number'], this.subject);
  this.expected = expected;
  this.failureDetails = ['Expected', this.subject, 'to be greater than or equal to', this.expected];
  return this.assert(this.subject >= this.expected);
}