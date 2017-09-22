import { expect } from 'chai';
import Reporter from './Reporter';
import Report from './Report';
import MessageType from './MessageType';
import Counter from './Counter';

class Expectation {

    subject: any;
    expected: any;
    counter: number;
    des: string;
    messages: Array<Report>;
    not: Expectation;
    isNot: boolean;

    constructor(subject: any, counter: number, des: string, isNot: boolean = false) {
        Counter.incrementTestCount();
        this.subject = subject;
        this.counter = counter;
        this.des = des;
        this.messages = new Array<Report>();
        this.isNot = isNot;
        if (isNot === false) {
            this.not = new Expectation(this.subject, counter, des, true);
        }
    }

    toBe = (objectToMatch: any): boolean => {
        this.expected = objectToMatch;
        return this.assert(this.subject.toString() === objectToMatch.toString());
    }

    toEqual = (objectToMatch: any): boolean => {
        this.expected = objectToMatch;
        return this.assert(this.subject === objectToMatch);
    }

    toBeDefined = (): boolean => {
        this.expected = Object;
        return this.assert(typeof (this.subject) !== "undefined");
    }


    toBeUndefined = (): boolean => {
        this.expected = Object;
        return this.assert(typeof (this.subject) === "undefined");
    }

    toBeNotNull = (): boolean => {
        this.expected = Object;
        return this.assert(this.subject !== null);
    }

    toBeNull = (): boolean => {
        this.expected = Object;
        return this.assert(this.subject === null);
    }

    toBeGreaterThanOrEqualTo = (objectToMatch: any): boolean => {
        this.expected = objectToMatch;
        return this.assert(this.subject >= this.expected);
    }

    toBeLessThanOrEqualTo = (objectToMatch: any): boolean => {
        this.expected = objectToMatch;
        return this.assert(this.subject <= this.expected);
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
        this.expected = item;

        if (this.subject.constructor.name === 'Array') {
            return this.assert(this.subject.includes(item));
        }
        else if (this.subject.constructor.name === "Set") {
            return this.assert(this.subject.has(item));
        }
        else {
            this.messages.push(new Report(['Subject is a '
                + this.subject.constructor.name
                + ', not an Array or Set']
                , MessageType.COMPARISON
                , this.counter));

            return this.assert(false);
        }
    }

    toHaveKey = function (item: any) {
        return this.assert(this.subject.has(item));
    }

    assert = function (x: boolean): boolean {
        if (this.isNot ? x : !x) {
            Reporter.getInstance().report(new Report([this.des], MessageType.ERROR, this.counter));
            Reporter.getInstance().report(new Report(['Expected', this.expected, ' => ', this.expected.constructor.name, ' | Actual: ', this.subject, ' => ', this.subject.constructor.name], MessageType.COMPARISON, this.counter));

            Counter.incrementFailCount();
            return false;
        }
        else {

            Reporter.getInstance().report(new Report([this.des], MessageType.OK, this.counter));
            this.messages.forEach((message: Report) => {
                Reporter.getInstance().report(message);
            });
            Counter.incrementPassCount();
            return true;
        }
    }
}

export default Expectation;