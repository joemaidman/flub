import { assert } from '../assert';

export function toBeNotNull(): boolean {
    this.expected = Object;
    this.failureDetails = ['Expected', this.subject, 'not to be null'];
    return assert(this.subject !== null, this);
}
