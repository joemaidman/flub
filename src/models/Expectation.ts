import { expect } from 'chai';
import Reporter from './Reporter';
import Report from './Report';
import MessageType from './MessageType';
import * as Counter from './Counter';
import { checkType } from './Utilities'
import * as R from 'ramda';
import * as PrettyError from 'pretty-error';
import { Fail, fails } from './Failure'
import {
    printStartHeader,
    printReloadHeader,
    printTestSummary,
    printWatching,
    printCaughtException
} from './Logging';

class Expectation {

    subject: any;
    expected: any;
    des: string;
    failureDetails: Array<string>;
    messages: Array<Report>;
    not: Expectation;
    isNot: boolean;
    throwsArgs: Array<any>;

    constructor(subject: any, des: string, isNot: boolean = false) {
        this.subject = subject;
        this.des = des;
        this.failureDetails = new Array<string>();
        this.messages = new Array<Report>();
        this.isNot = isNot;
        if (isNot === false) {
            this.not = new Expectation(this.subject, des, true);
        }
    }

    with = function (): boolean {
        this.throwsArgs = Array.prototype.slice.call(arguments);
        return this;
    }

    toBe = (objectToMatch: any): boolean => {
        this.expected = objectToMatch;
        this.failureDetails = ['Expected', this.expected,
            ' => ',
            this.expected.constructor.name,
            ' | Actual: ',
            this.subject,
            ' => ',
            this.subject.constructor.name];
        return this.assert(this.subject === objectToMatch);
    }

    toEqual = (objectToMatch: any): boolean => {
        this.expected = objectToMatch;
        this.failureDetails = ['Expected ', this.expected,
            ' => ',
            this.expected.constructor.name,
            ' | Actual: ',
            this.subject,
            ' => ',
            this.subject.constructor.name];
        return this.assert(this.subject === objectToMatch);
    }

    toBeDefined = (): boolean => {
        this.expected = Object;
        this.failureDetails = ['Expected ', this.subject, ' to be defined'];
        return this.assert(typeof (this.subject) !== "undefined");
    }

    toBeUndefined = (): boolean => {
        this.expected = undefined;
        this.failureDetails = ['Expected ', this.subject, ' to be undefined'];
        return this.assert(typeof (this.subject) === "undefined");
    }

    toBeNotNull = (): boolean => {
        this.expected = Object;
        this.failureDetails = ['Expected ', this.subject, ' not to be null'];
        return this.assert(this.subject !== null);
    }

    toBeNull = (): boolean => {
        this.expected = null;
        this.failureDetails = ['Expected ', this.subject, ' to be null'];
        return this.assert(this.subject === null);
    }

    toBeGreaterThanOrEqualTo = (objectToMatch: any): boolean => {
        this.expected = objectToMatch;
        this.failureDetails = ['Expected ', this.subject, ' to be greater than or equal to ', this.expected];
        return this.assert(this.subject >= this.expected);
    }

    toBeLessThanOrEqualTo = (objectToMatch: any): boolean => {
        this.expected = objectToMatch;
        this.failureDetails = ['Expected ', this.subject, ' to be less than or equal to ', this.expected];
        return this.assert(this.subject <= this.expected);
    }

    toBeGreaterThan = (objectToMatch: any): boolean => {
        this.expected = objectToMatch;
        this.failureDetails = ['Expected ', this.subject, ' to be greater than ', this.expected];
        return this.assert(this.subject > this.expected);
    }

    toBeLessThan = (objectToMatch: any): boolean => {
        this.expected = objectToMatch;
        this.failureDetails = ['Expected ', this.subject, ' to be less than ', this.expected];
        return this.assert(this.subject < this.expected);
    }

    toBeBetweenInclusive = (min: number, max: number): boolean => {
        this.expected = Object;
        this.failureDetails = ['Expected ', this.subject, ' to be inclusively between ', min, ' and ', max];
        return this.assert(this.subject >= min && this.subject <= max);
    }

    toBeBetweenExclusive = (min: number, max: number): boolean => {
        this.expected = Object;
        this.failureDetails = ['Expected ', this.subject, ' to be exclusively between ', min, ' and ', max];
        return this.assert(this.subject > min && this.subject < max);
    }

    toBeTypeOf = (type: string): boolean => {
        this.expected = type;
        this.failureDetails = ['Expected ', this.subject, ' to be of type ', this.expected, ' but was ', this.subject.constructor.name];
        return this.assert(this.subject.constructor.name.toLowerCase() === type.toLowerCase());
    }

    toRespondTo = (functionName: string): boolean => {
        this.expected = functionName;
        this.failureDetails = ['Expected ', this.subject, ' to respond to ', this.expected];
        return this.assert(this.subject[functionName]);
    }

    toHaveLength = (length: number): boolean => {
        this.expected = length;
        this.failureDetails = ['Expected ', this.subject, ' to have length of ', this.expected];
        if (this.subject.constructor.name === 'Array') {
            return this.assert(this.subject.length === length);
        }
        else if (this.subject.constructor.name === "Set"
            || this.subject.constructor.name === "Map") {
            return this.assert(this.subject.size === length);
        }
        return this.assert(false);
    }

    toBeFalsey = (): boolean => {
        this.failureDetails = ['Expected ', this.subject, ' to be falsey'];
        return this.assert(!this.subject);
    }

    toBeTruthy = (): boolean => {
        this.failureDetails = ['Expected ', this.subject, ' to be truthy'];
        return this.assert(this.subject);
    }

    toBeCloseToInclusive = (target: number, delta: number): boolean => {
        this.failureDetails = ['Expected ', this.subject, ' to be inclusively within ', delta, ' of ', target];
        const min = target - delta;
        const max = target + delta;
        return this.assert(this.subject >= min && this.subject <= max);
    }

    toBeCloseToExclusive = (target: number, delta: number): boolean => {
        this.failureDetails = ['Expected ', this.subject, ' to be exclusively within ', delta, ' of ', target];
        const min = target - delta;
        const max = target + delta;
        return this.assert(this.subject > min && this.subject < max);
    }

    toContain = (item: any): boolean => {
        this.expected = item;
        this.failureDetails = ['Expected ', this.subject, ' to contain ', this.expected];
        checkType(['Array', 'Set'], this.subject);
        if (this.subject.constructor.name === 'Array') {
            return this.assert(this.subject.includes(item));
        }
        else if (this.subject.constructor.name === "Set") {
            return this.assert(this.subject.has(item));
        }
        else {
            return this.assert(this.subject.includes(item));
        }
    }

    toThrow = (message: string): boolean => {
        this.expected = message;
        this.failureDetails = ['Expected ', this.subject, ' to throw ', this.expected];
        let didThrow: boolean = false;
        let thrownMessage: string = '';
        try {

            this.throwsArgs
                ? this.subject(this.throwsArgs)
                : this.subject();
        }
        catch (e) {
            didThrow = true;
            thrownMessage = e;
        }

        return this.assert(didThrow === true
            && thrownMessage === message)
    }

    toThrowError = (type: any, message: string): boolean => {
        this.expected = message;
        let thrownType: any = 'Error';
        let didThrow: boolean = false;
        let thrownMessage: string = '';
        let errorType: any;
        try {
            this.subject();
        }
        catch (e) {
            didThrow = true;
            thrownType = e.name;
            thrownMessage = e.message;
        }
        if (didThrow) {
            this.failureDetails = ['Expected ', this.subject, ' to throw ', type, ' error with ', message, 'but threw',
                thrownType, 'error with ', thrownMessage];
        }
        else {
            this.failureDetails = ['Expected ', this.subject, ' to throw ', type, ' error with ', message, 'but did not throw']
        }

        return this.assert(didThrow === true
            && thrownMessage === message
            && thrownType === type.name)
    }

    toHaveKey = (item: any): boolean => {
        this.failureDetails = ['Expected ', this.subject, ' to have key ', item];
        //This should work for objects too
        return this.assert(this.subject.has(item));
    }

    toHaveBeenCalled = (times: number): boolean => {
        this.failureDetails = ['Expected spy to have been called ', times, ' times but was called ', this.subject.getCallCount(), ' times'];
        checkType('Spy', this.subject);
        this.expected = times;
        return this.assert(this.subject.getCallCount() === times);
    }

    toHaveBeenCalledWith = function (): boolean {
        checkType('Spy', this.subject);
        this.expected = arguments;
        this.failureDetails = ['Expected spy to have been called with ', this.expected, '. Call history: ', this.subject.getCallHistory()];
        return this.assert(
            R.contains(
                Array.prototype.slice.call(arguments),
                this.subject.getCallHistory()
            ));
    }

    assert = (x: boolean): boolean => {
        if (this.isNot ? x : !x) {
            Reporter.report(new Report([this.des], MessageType.ERROR));
            if (this.subject && this.expected) {
                Reporter.report(new Report(this.failureDetails, MessageType.COMPARISON));
            }
            Counter.incrementFailCount();   
            try {
                throw new Error('Assertion error');
            }
            catch (error) {
                var prettyError = new PrettyError();
                prettyError.skipPackage('bed-rock');
                prettyError.appendStyle({
               
                    'pretty-error > trace > item > header > what': {
                        display: 'none'
                     },
                     'pretty-error > trace > item': {
                       display: 'block',
                       marginBottom: 0,
                       marginLeft: 2,
                       bullet: '"<grey>-</grey>"'
                     },
                     'pretty-error > trace':{
                     display: 'block',
                     marginTop: 0
                    },
                    "block": {
                        display: "block",
                       
                        "height": "100"
                      }
                 
                        
                });
                var prettyTrace = prettyError.render(error);
                printCaughtException(error.message, prettyTrace);
            }
            return false;
        }
        else {

            Reporter.report(new Report([this.des], MessageType.OK));
            Counter.incrementPassCount();
            return true;
        }
    }
}

export default Expectation;