export function toBeFalsey(): boolean {
  this.failureDetails = ['Expected', this.subject, 'to be falsey'];
  return this.assert(!this.subject);
}
