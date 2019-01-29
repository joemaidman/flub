export function toBeUndefined(): boolean {
  this.expected = undefined;
  this.failureDetails = ['Expected', this.subject, 'to be undefined'];
  return this.assert(this.subject === undefined);
}