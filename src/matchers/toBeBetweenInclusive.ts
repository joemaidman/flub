import { checkType } from '../utilities';
import { assert } from '../assert';

export function toBeBetweenInclusive(
    minimumThreshold: number,
    maximumThreshold: number
): boolean {
    checkType(['Number'], this.subject);
    this.expected = Object;
    this.failureDetails = [
        'Expected',
        this.subject,
        'to be inclusively between',
        minimumThreshold,
        'and',
        maximumThreshold,
    ];
    return assert(
        this.subject >= minimumThreshold && this.subject <= maximumThreshold,
        this
    );
}
