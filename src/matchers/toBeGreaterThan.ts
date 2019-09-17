import { checkType } from '../utilities';
import { assert } from '../assert';

export function toBeGreaterThan(expected: any): boolean {
    checkType(['Number'], this.subject);
    this.expected = expected;
    this.failureDetails = [
        'Expected',
        this.subject,
        'to be greater than',
        this.expected,
    ];
    return assert(this.subject > this.expected, this);
}
