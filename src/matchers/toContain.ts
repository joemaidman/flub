import { checkType } from '../utilities';

export function toContain(item: any): boolean {
  checkType(['Array', 'Set', 'Map', 'String'], this.subject);
  this.expected = item;
  this.failureDetails = ['Expected', this.subject, 'to contain', this.expected];

  if (this.subject.constructor.name === 'Array' || this.subject.constructor.name === 'String') {
      return this.assert(this.subject.includes(item));
  }
  else if (this.subject.constructor.name === 'Set' || this.subject.constructor.name === 'Map') {
      return this.assert(this.subject.has(item));
  }

  return false;
}