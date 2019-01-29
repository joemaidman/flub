export function toHaveKey(key: any): boolean {
  this.failureDetails = ['Expected', this.subject, 'to have key', key];
  if (this.subject.constructor.name === 'Map') {
      return this.assert(this.subject.has(key));
  }
  else {
      return this.assert(this.subject.hasOwnProperty(key.toString()));
  }
}