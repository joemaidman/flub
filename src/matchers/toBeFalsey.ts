import { assert } from '../assert';

export function toBeFalsey(): boolean {
    this.failureDetails = ['Expected', this.subject, 'to be falsey'];
    return assert(!this.subject, this);
}
