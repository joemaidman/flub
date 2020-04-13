import { assert } from '../assert';

export function toBeTypeOf(type: string): boolean {
    this.expected = type;
    this.failureDetails = [
        'Expected',
        this.subject,
        'to be of type',
        this.expected,
        'but was',
        this.subject.constructor.name,
    ];
    return assert(
        this.subject.constructor.name.toLowerCase() === type.toLowerCase(),
        this
    );
}
