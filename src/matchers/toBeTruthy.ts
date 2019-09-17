import { assert } from '../assert';

export function toBeTruthy(): boolean {
    this.failureDetails = ['Expected', this.subject, 'to be truthy'];
    return assert(this.subject, this);
}
