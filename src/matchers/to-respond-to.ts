import { assert } from '../assert';

export function toRespondTo(attribute: string): boolean {
    this.expected = attribute;
    this.failureDetails = [
        'Expected',
        this.subject,
        'to respond to',
        this.expected,
    ];
    return assert(this.subject[attribute], this);
}
