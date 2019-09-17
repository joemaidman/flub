import { checkType } from '../utilities';
import { assert } from '../assert';

export function toBeLessThan(expected: any): boolean {
    checkType(['Number'], this.subject);
    this.expected = expected;
    this.failureDetails = [
        'Expected',
        this.subject,
        'to be less than',
        this.expected,
    ];
    return assert(this.subject < this.expected, this);
}
