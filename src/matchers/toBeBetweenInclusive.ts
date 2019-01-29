import { checkType } from '../utilities';

export function toBeBetweenInclusive(minimumThreshold: number, maximumThreshold: number): boolean {
  checkType(['Number'], this.subject);
  this.expected = Object;
  this.failureDetails = ['Expected', this.subject, 'to be inclusively between', minimumThreshold, 'and', maximumThreshold];
  return this.assert(this.subject >= minimumThreshold && this.subject <= maximumThreshold);
}