import { checkType } from '../utilities';
import { assert } from '../assert';

export function toHaveLength(length: number): boolean {
    checkType(['Array', 'Set', 'Map', 'String'], this.subject);
    this.expected = length;
    if (this.subject.constructor.name === 'Array') {
        this.failureDetails = [
            'Expected Array',
            this.subject,
            'to have length of',
            this.expected,
            'but had length of',
            this.subject.length,
        ];
        return assert(this.subject.length === length, this);
    } else if (
        this.subject.constructor.name === 'Set' ||
        this.subject.constructor.name === 'Map'
    ) {
        this.failureDetails = [
            'Expected',
            this.subject,
            'to have size of',
            this.expected,
            'but had size of',
            this.subject.size,
        ];
        return assert(this.subject.size === length, this);
    } else if (this.subject.constructor.name === 'String') {
        return assert(this.subject.length === length, this);
    }
    return assert(false, this);
}
