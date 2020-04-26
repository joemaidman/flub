import * as R from 'ramda';

import { checkType } from '../utilities';
import { assert } from '../assert';

export function toHaveBeenCalledWith(...args: any[]): boolean {
    checkType('Spy', this.subject);
    let argsArray: Array<string> = new Array<string>();
    for (let p in arguments) {
        if (arguments.hasOwnProperty(p)) {
            argsArray.push(arguments[p]);
        }
    }
    this.expected = arguments;
    this.failureDetails = [
        'Expected',
        'spy',
        'to have been called with [',
        argsArray.join(', '),
        '].\n ',
        ' ',
        'Call history:',
        this.subject.getCallHistoryFormatted(),
    ];
    return assert(
        R.contains(
            Array.prototype.slice.call(arguments),
            this.subject.getCallHistory()
        ),
        this
    );
}
