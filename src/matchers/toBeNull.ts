import { assert } from '../assert';

export function toBeNull(): boolean {
    this.expected = null;
    this.failureDetails = ['Expected', this.subject, 'to be null'];
    return assert(this.subject === null, this);
}
