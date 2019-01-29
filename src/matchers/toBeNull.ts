export function toBeNull(): boolean {
  this.expected = null;
  this.failureDetails = ['Expected', this.subject, 'to be null'];
  return this.assert(this.subject === null);
}