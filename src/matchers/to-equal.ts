import * as R from 'ramda';
import { assert } from '../assert';

export function toEqual(expected: any): boolean {
    this.expected = expected;
    this.failureDetails = [
        'Expected',
        this.expected,
        '[',
        this.expected.constructor.name,
        ']',
        'to equal',
        this.subject,
        '[',
        this.subject.constructor.name,
        ']',
    ];
    return assert(R.equals(this.subject, expected), this);
}
