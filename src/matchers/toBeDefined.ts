export function toBeDefined(): boolean {
  this.expected = Object;
  this.failureDetails = ['Expected', this.subject, 'to be defined'];
  return this.assert(this.subject !== undefined);
}