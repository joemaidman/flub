import { checkType } from '../utilities';

export function toBeCloseToInclusive(target: number, delta: number): boolean {
  checkType(['Number'], this.subject);
  this.failureDetails = ['Expected', this.subject, 'to be inclusively within', delta, 'of', target];
  const min = target - delta;
  const max = target + delta;
  return this.assert(this.subject >= min && this.subject <= max);
}