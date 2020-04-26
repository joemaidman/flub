import { checkType } from '../utilities';
import { assert } from '../assert';

export function toBeStringMatching(regexPattern: RegExp): boolean {
    checkType(['String'], this.subject);
    this.failureDetails = [
        'Expected',
        this.subject,
        'to be a string matching',
        regexPattern,
    ];
    return assert(regexPattern.test(this.subject), this);
}
