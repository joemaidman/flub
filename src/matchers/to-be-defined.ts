import { assert } from '../assert';

export function toBeDefined(): boolean {
    this.expected = Object;
    this.failureDetails = ['Expected', this.subject, 'to be defined'];
    return assert(this.subject !== undefined, this);
}
