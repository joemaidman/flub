import { checkType } from '../utilities';
import { assert } from '../assert';

export function toBeStringContaining(
    text: string,
    caseSensitive: boolean = false
): boolean {
    checkType(['String'], this.subject);
    this.failureDetails = [
        'Expected',
        this.subject,
        'to be a string containing',
        text,
        '(case',
        caseSensitive ? 'sensitive' : 'insensitive',
    ];
    if (caseSensitive) {
        return assert(this.subject.includes(text), this);
    } else {
        return assert(
            this.subject.toLowerCase().includes(text.toLowerCase()),
            this
        );
    }
}
