import { checkType } from '../utilities';

export function toBeStringMatching(regexPattern: RegExp): boolean {
  checkType(['String'], this.subject);
  this.failureDetails = ['Expected', this.subject, 'to be a string matching', regexPattern];
  return this.assert(regexPattern.test(this.subject));
}