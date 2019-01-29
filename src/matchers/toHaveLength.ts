import { checkType } from '../utilities';

export function toHaveLength(length: number): boolean {
  checkType(['Array', 'Set', 'Map', 'String'], this.subject);
  this.expected = length;
  if (this.subject.constructor.name === 'Array') {
      this.failureDetails = [
          'Expected Array',
          this.subject,
          'to have length of',
          this.expected,
          'but had length of',
          this.subject.length
      ];
      return this.assert(this.subject.length === length);
  }
  else if (this.subject.constructor.name === 'Set'
      || this.subject.constructor.name === 'Map') {
      this.failureDetails = [
          'Expected',
          this.subject,
          'to have size of',
          this.expected,
          'but had size of',
          this.subject.size
      ];
      return this.assert(this.subject.size === length);
  }
  else if (this.subject.constructor.name === 'String') {
      return this.assert(this.subject.length === length);
  }
  return this.assert(false);
}