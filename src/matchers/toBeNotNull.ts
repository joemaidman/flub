export function toBeNotNull(): boolean {
  this.expected = Object;
  this.failureDetails = ['Expected', this.subject, 'not to be null'];
  return this.assert(this.subject !== null);
}