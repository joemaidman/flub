export function toBeTruthy(): boolean {
  this.failureDetails = ['Expected', this.subject, 'to be truthy'];
  return this.assert(this.subject);
}