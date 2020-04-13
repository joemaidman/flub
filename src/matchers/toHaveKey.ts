import { assert } from '../assert';

export function toHaveKey(key: any): boolean {
    this.failureDetails = ['Expected', this.subject, 'to have key', key];
    if (this.subject.constructor.name === 'Map') {
        return assert(this.subject.has(key), this);
    } else {
        return assert(this.subject.hasOwnProperty(key.toString()), this);
    }
}
