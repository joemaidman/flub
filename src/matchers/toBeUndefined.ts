import { assert } from '../assert';

export function toBeUndefined(): boolean {
    this.expected = undefined;
    this.failureDetails = ['Expected', this.subject, 'to be undefined'];
    return assert(this.subject === undefined, this);
}
