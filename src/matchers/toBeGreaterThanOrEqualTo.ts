import { checkType } from '../utilities';
import { assert } from '../assert';

export function toBeGreaterThanOrEqualTo(expected: number): boolean {
    checkType(['Number'], this.subject);
    this.expected = expected;
    this.failureDetails = [
        'Expected',
        this.subject,
        'to be greater than or equal to',
        this.expected,
    ];
    return assert(this.subject >= this.expected, this);
}
