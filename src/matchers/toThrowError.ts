import { checkType } from '../utilities';
import { assert } from '../assert';

export function toThrowError(errorType: any, errorMessage: string): boolean {
    checkType(['Function'], this.subject);
    this.expected = errorMessage;
    let thrownType: any = 'Error';
    let didThrow: boolean = false;
    let thrownMessage: string = '';

    try {
        this.throwsArgs ? this.subject(this.throwsArgs) : this.subject();
    } catch (e) {
        didThrow = true;
        thrownType = e.constructor.name;
        thrownMessage = e.message;
    }
    if (didThrow) {
        this.failureDetails = [
            'Expected',
            this.subject,
            'to throw',
            errorType.name,
            'error with "',
            errorMessage,
            '" but it threw ',
            thrownType,
            ' error with "',
            thrownMessage,
            '"',
        ];
    } else {
        this.failureDetails = [
            'Expected',
            this.subject,
            'to throw',
            errorType,
            'error with',
            errorMessage,
            'but it did not throw',
        ];
    }

    return assert(
        didThrow === true &&
            thrownMessage === errorMessage &&
            thrownType === errorType,
        this
    );
}
