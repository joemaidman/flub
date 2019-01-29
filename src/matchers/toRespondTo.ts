export function toRespondTo(attribute: string): boolean {
  this.expected = attribute;
  this.failureDetails = ['Expected', this.subject, 'to respond to', this.expected];
  return this.assert(this.subject[attribute]);
}