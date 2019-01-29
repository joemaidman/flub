import { checkType } from '../utilities';

export function toHaveBeenCalled(callCount: number): boolean {
  checkType('Spy', this.subject);
  this.failureDetails = [
      'Expected',
      'spy',
      'to have been called',
      callCount,
      'times but was called',
      this.subject.getCallCount(),
      'times'
  ];
  this.expected = callCount;
  return this.assert(this.subject.getCallCount() === callCount);
}