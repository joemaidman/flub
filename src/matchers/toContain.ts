import { checkType } from '../utilities';
import { assert } from '../assert';

export function toContain(item: any): boolean {
    checkType(['Array', 'Set', 'Map', 'String'], this.subject);
    this.expected = item;
    this.failureDetails = [
        'Expected',
        this.subject,
        'to contain',
        this.expected,
    ];

    if (
        this.subject.constructor.name === 'Array' ||
        this.subject.constructor.name === 'String'
    ) {
        return assert(this.subject.includes(item), this);
    } else if (
        this.subject.constructor.name === 'Set' ||
        this.subject.constructor.name === 'Map'
    ) {
        return assert(this.subject.has(item), this);
    }

    return false;
}
