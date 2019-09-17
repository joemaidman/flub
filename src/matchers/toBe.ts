import { assert } from '../assert';

export function toBe(expected: any): boolean {
    this.expected = expected;
    this.failureDetails = [
        'Expected',
        this.expected,
        '[',
        this.expected.constructor.name,
        ']',
        'to be',
        this.subject,
        '[',
        this.subject.constructor.name,
        ']',
    ];
    return assert(this.subject === expected, this);
}
