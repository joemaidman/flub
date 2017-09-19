import Reporter from './Reporter'
import MessageType from './MessageType'

class Expectation {

    subject: any;
    expected: any;
    counter: number;
    des: string;

    constructor(subject: any, counter: number, des: string) {
        this.subject = subject;
        this.counter = counter;
        this.des = des;
    }

    toBe = (objectToMatch: any): boolean => {
        this.expected = objectToMatch;
        return this.assert(this.subject.toString() === objectToMatch.toString());
    }

    toEqual = (objectToMatch: any): boolean => {
        this.expected = objectToMatch;
        return this.assert(this.subject.toString() === objectToMatch.toString());
    }

    toBeDefined = (): boolean => {
        this.expected = Object;
        return this.assert(typeof (this.subject) !== "undefined");
    }

    toBeNull = (): boolean => {
        this.expected = Object;
        return this.assert(this.subject === null);
    }

    toBeGreaterThan = (objectToMatch: any): boolean => {
        this.expected = objectToMatch;
        return this.assert(this.subject > this.expected);
    }

    toBeLessThan = (objectToMatch: any): boolean => {
        this.expected = objectToMatch;
        return this.assert(this.subject < this.expected);
    }

    toBeBetweenInclusive = (min: number, max: number): boolean => {
        this.expected = Object;
        return this.assert(this.subject >= min && this.subject <= max);
    }

    toBeBetweenExclusive = (min: number, max: number): boolean => {
        this.expected = Object;
        return this.assert(this.subject > min && this.subject < max);
    }

    toBeTypeOf = function (type: string): boolean {
        this.expected = type;
        return this.assert(this.subject.constructor.name.toLowerCase() === type.toLowerCase());
    }

    toRespondTo = function (functionName: string): boolean {
        this.expected = functionName;
        return typeof this.subject[functionName] === 'function';
    }

    toHaveLength = function (length: number): boolean {
        if (this.subject.constructor.name === 'Array') {
            return this.assert(this.subject.length === length);
        }
        else if (this.subject.constructor.name === "Set"
            || this.subject.constructor.name === "Map") {
            return this.assert(this.subject.size === length);
        }

        return false;

    }

    toBeFalsey = function (): boolean {
        return this.assert(!this.subject);
    }

    toBeTruthy = function (): boolean {
        return this.assert(this.subject);
    }

    toBeCloseToInclusive = function (target: number, delta: number) {
        const min = target - delta;
        const max = target + delta;
        return this.assert(this.subject >= min && this.subject <= max);
    }

    toBeCloseToExclusive = function (target: number, delta: number) {
        const min = target - delta;
        const max = target + delta;
        return this.assert(this.subject > min && this.subject < max);
    }

    toContain = function (item: any) {
        if (this.subject.constructor.name === 'Array') {
            return this.assert(this.subject.includes(item));
        }
        else if (this.subject.constructor.name === "Set") {
            return this.assert(this.subject.has(item));
        }
    }

    toHaveKey = function (item: any) {
        return this.assert(this.subject.has(item));
    }

    assert = function (x: boolean): boolean {
        try {
            if (!x) {
                Reporter.getInstance().report(this.des, MessageType.ERROR, this.counter);
                Reporter.getInstance().report("Expected: " + this.expected.toString() +
                    " | Actual: " + this.subject.toString(), MessageType.COMPARISON, this.counter);
                return false;
            }
            else {

                Reporter.getInstance().report(this.des, MessageType.OK, this.counter);
                return true;
            }
        } catch (error) {

            Reporter.getInstance().report(this.des, MessageType.ERROR, this.counter);
            Reporter.getInstance().report(error.stack, MessageType.ERROR, this.counter);

            return false;
        }
    }
}

export default Expectation;