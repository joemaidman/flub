import { expect } from 'chai';
import * as R from 'ramda';
import * as PrettyError from 'pretty-error';

import Reporter from './Reporter';
import Report from './Report';
import MessageType from './MessageType';
import * as Counter from './Counter';
import { checkType } from './Utilities';
import { FailureReport, failureList } from './FailureReport';
import {
    printStartHeader,
    printReloadHeader,
    printTestSummary,
    printWatching,
    printCaughtException
} from './Logging';
import ContextChain from './ContextChain';
import { ErrorStyle } from '../Resources/ErrorStyle';

class Expectation {

    subject: any;
    expected: any;
    des: string;
    failureMessages: Array<Report>;
    failureDetails: Array<string>;
    actualResult: Array<string>;
    messages: Array<Report>;
    not: Expectation;
    isNot: boolean;
    throwsArgs: Array<any>;
    contextChain: Array<string>;

    constructor(subject: any, des: string, isNot: boolean = false) {
        this.subject = subject;
        this.des = des;
        this.failureDetails = new Array<string>();
        this.actualResult = new Array<string>();
        this.failureMessages = new Array<Report>();
        this.messages = new Array<Report>();
        this.contextChain = ContextChain.chain;
        this.isNot = isNot;
        if (isNot === false) {
            this.not = new Expectation(this.subject, des, true);
        }
    }

    with = function (...args: any[]): Expectation {
        this.throwsArgs = Array.prototype.slice.call(arguments);
        return this;
    };

    toBe = (expected: any): boolean => {
        this.expected = expected;
        this.failureDetails = [
            'Expected',
            this.expected,
            '[',
            this.expected.constructor.name,
            ']',
            'to be',
            this.subject,
            '[',
            this.subject.constructor.name,
            ']'
        ];
        return this.assert(this.subject === expected);
    }

    toEqual = (expected: any): boolean => {
        this.expected = expected;
        this.failureDetails = [
            'Expected',
            this.expected,
            '[',
            this.expected.constructor.name,
            ']',
            'to equal',
            this.subject,
            '[',
            this.subject.constructor.name,
            ']',
        ];
        return this.assert(R.equals(this.subject, expected));
    }

    toBeDefined = (): boolean => {
        this.expected = Object;
        this.failureDetails = ['Expected', this.subject, 'to be defined'];
        return this.assert(this.subject !== undefined);
    }

    toBeUndefined = (): boolean => {
        this.expected = undefined;
        this.failureDetails = ['Expected', this.subject, 'to be undefined'];
        return this.assert(this.subject === undefined);
    }

    toBeNotNull = (): boolean => {
        this.expected = Object;
        this.failureDetails = ['Expected', this.subject, 'not to be null'];
        return this.assert(this.subject !== null);
    }

    toBeNull = (): boolean => {
        this.expected = null;
        this.failureDetails = ['Expected', this.subject, 'to be null'];
        return this.assert(this.subject === null);
    }

    toBeGreaterThanOrEqualTo = (expected: number): boolean => {
        checkType(['Number'], this.subject);
        this.expected = expected;
        this.failureDetails = ['Expected', this.subject, 'to be greater than or equal to', this.expected];
        return this.assert(this.subject >= this.expected);
    }

    toBeLessThanOrEqualTo = (expected: any): boolean => {
        checkType(['Number'], this.subject);
        this.expected = expected;
        this.failureDetails = ['Expected', this.subject, 'to be less than or equal to', this.expected];
        return this.assert(this.subject <= this.expected);
    }

    toBeGreaterThan = (expected: any): boolean => {
        checkType(['Number'], this.subject);
        this.expected = expected;
        this.failureDetails = ['Expected', this.subject, 'to be greater than', this.expected];
        return this.assert(this.subject > this.expected);
    }

    toBeLessThan = (expected: any): boolean => {
        checkType(['Number'], this.subject);
        this.expected = expected;
        this.failureDetails = ['Expected', this.subject, 'to be less than', this.expected];
        return this.assert(this.subject < this.expected);
    }

    toBeBetweenInclusive = (minimumThreshold: number, maximumThreshold: number): boolean => {
        checkType(['Number'], this.subject);
        this.expected = Object;
        this.failureDetails = ['Expected', this.subject, 'to be inclusively between', minimumThreshold, 'and', maximumThreshold];
        return this.assert(this.subject >= minimumThreshold && this.subject <= maximumThreshold);
    }

    toBeBetweenExclusive = (minimumThreshold: number, maximumThreshold: number): boolean => {
        checkType(['Number'], this.subject);
        this.expected = Object;
        this.failureDetails = ['Expected', this.subject, 'to be exclusively between', minimumThreshold, 'and', maximumThreshold];
        return this.assert(this.subject > minimumThreshold && this.subject < maximumThreshold);
    }

    toBeCloseToInclusive = (target: number, delta: number): boolean => {
        checkType(['Number'], this.subject);
        this.failureDetails = ['Expected', this.subject, 'to be inclusively within', delta, 'of', target];
        const min = target - delta;
        const max = target + delta;
        return this.assert(this.subject >= min && this.subject <= max);
    }

    toBeCloseToExclusive = (target: number, delta: number): boolean => {
        checkType(['Number'], this.subject);
        this.failureDetails = ['Expected', this.subject, 'to be exclusively within', delta, 'of', target];
        const min = target - delta;
        const max = target + delta;
        return this.assert(this.subject > min && this.subject < max);
    }

    toBeTypeOf = (type: string): boolean => {
        this.expected = type;
        this.failureDetails = ['Expected', this.subject, 'to be of type', this.expected, 'but was', this.subject.constructor.name];
        return this.assert(this.subject.constructor.name.toLowerCase() === type.toLowerCase());
    }

    toRespondTo = (attribute: string): boolean => {
        this.expected = attribute;
        this.failureDetails = ['Expected', this.subject, 'to respond to', this.expected];
        return this.assert(this.subject[attribute]);
    }

    toHaveLength = (length: number): boolean => {
        checkType(['Array', 'Set', 'Map', 'String'], this.subject);
        this.expected = length;
        if (this.subject.constructor.name === 'Array') {
            this.failureDetails = [
                'Expected Array',
                this.subject,
                'to have length of',
                this.expected,
                'but had length of',
                this.subject.length
            ];
            return this.assert(this.subject.length === length);
        }
        else if (this.subject.constructor.name === 'Set'
            || this.subject.constructor.name === 'Map') {
            this.failureDetails = [
                'Expected',
                this.subject,
                'to have size of',
                this.expected,
                'but had size of',
                this.subject.size
            ];
            return this.assert(this.subject.size === length);
        }
        else if (this.subject.constructor.name === 'String') {
            return this.assert(this.subject.length === length);
        }
        return this.assert(false);
    }

    toBeFalsey = (): boolean => {
        this.failureDetails = ['Expected', this.subject, 'to be falsey'];
        return this.assert(!this.subject);
    }

    toBeTruthy = (): boolean => {
        this.failureDetails = ['Expected', this.subject, 'to be truthy'];
        return this.assert(this.subject);
    }

    toBeStringContaining = (text: string, caseSensitive: boolean = false): boolean => {
        checkType(['String'], this.subject);
        this.failureDetails = ['Expected',
            this.subject, 'to be a string containing',
            text,
            '(case',
            caseSensitive ? 'sensitive' : 'insensitive'
        ];
        if (caseSensitive) {
            return this.assert(this.subject.includes(text));
        }
        else {
            return this.assert(this.subject.toLowerCase().includes(text.toLowerCase()));
        }
    }

    toBeStringMatching = (regexPattern: RegExp): boolean => {
        checkType(['String'], this.subject);
        this.failureDetails = ['Expected', this.subject, 'to be a string matching', regexPattern];
        return this.assert(regexPattern.test(this.subject));
    }

    toContain = (item: any): boolean => {
        checkType(['Array', 'Set', 'Map', 'String'], this.subject);
        this.expected = item;
        this.failureDetails = ['Expected', this.subject, 'to contain', this.expected];

        if (this.subject.constructor.name === 'Array' || this.subject.constructor.name === 'String') {
            return this.assert(this.subject.includes(item));
        }
        else if (this.subject.constructor.name === 'Set' || this.subject.constructor.name === 'Map') {
            return this.assert(this.subject.has(item));
        }

        return false;
    }

    toThrow = (errorMessage: string): boolean => {
        checkType(['Function'], this.subject);
        this.expected = errorMessage;
        let didThrow: boolean = false;
        let thrownMessage: string = '';
        try {

            this.throwsArgs
                ? this.subject(this.throwsArgs)
                : this.subject();
        }
        catch (e) {
            didThrow = true;
            thrownMessage = e.message || e;
        }

        if (didThrow) {
            this.failureDetails = [
                'Expected',
                this.subject,
                'to throw "',
                this.expected,
                '" but it threw "',
                thrownMessage, '"'
            ];
        }
        else {
            this.failureDetails = [
                'Expected',
                this.subject,
                'to throw "',
                this.expected,
                '" but it did not throw'
            ];
        }

        return this.assert(didThrow === true
            && thrownMessage === errorMessage);
    }

    toThrowError = (errorType: any, errorMessage: string): boolean => {
        checkType(['Function'], this.subject);
        this.expected = errorMessage;
        let thrownType: any = 'Error';
        let didThrow: boolean = false;
        let thrownMessage: string = '';

        try {
            this.subject();
        }
        catch (e) {
            didThrow = true;
            thrownType = e.name;
            thrownMessage = e.message;
        }
        if (didThrow) {
            this.failureDetails = [
                'Expected',
                this.subject,
                'to throw',
                errorType.name, 'error with "',
                errorMessage,
                '" but it threw ',
                thrownType,
                ' error with "',
                thrownMessage,
                '"'
            ];
        }
        else {
            this.failureDetails = [
                'Expected',
                this.subject,
                'to throw',
                errorType,
                'error with',
                errorMessage,
                'but it did not throw'
            ];
        }

        return this.assert(didThrow === true
            && thrownMessage === errorMessage
            && thrownType === errorType.name);
    }

    toHaveKey = (key: any): boolean => {
        this.failureDetails = ['Expected', this.subject, 'to have key', key];
        if (this.subject.constructor.name === 'Map') {
            return this.assert(this.subject.has(key));
        }
        else {
            return this.assert(this.subject.hasOwnProperty(key.toString()));
        }
    }

    toHaveBeenCalled = (callCount: number): boolean => {
        checkType('Spy', this.subject);
        this.failureDetails = [
            'Expected',
            'spy',
            'to have been called',
            callCount,
            'times but was called',
            this.subject.getCallCount(),
            'times'
        ];
        this.expected = callCount;
        return this.assert(this.subject.getCallCount() === callCount);
    }

    toHaveBeenCalledWith = function (...args: any[]): boolean {
        checkType('Spy', this.subject);
        let argsArray: Array<string> = new Array<string>();
        for (let p in arguments) {
            if (arguments.hasOwnProperty(p)) {
                argsArray.push(arguments[p]);
            }
        }
        this.expected = arguments;
        this.failureDetails = [
            'Expected', 'spy',
            'to have been called with [',
            argsArray.join(', '),
            '].\n ',
            ' ',
            'Call history:',
            this.subject.getCallHistoryFormatted()
        ];
        return this.assert(
            R.contains(
                Array.prototype.slice.call(arguments),
                this.subject.getCallHistory()
            ));
    };

    toHaveBeenCalledWithFirst = function (...args: any[]): boolean {
        checkType('Spy', this.subject);
        let argsArray: Array<string> = new Array<string>();
        for (let p in arguments) {
            if (arguments.hasOwnProperty(p)) {
                argsArray.push(arguments[p]);
            }
        }
        this.expected = arguments;
        this.failureDetails = [
            'Expected', 'spy',
            'to have been called with [',
            argsArray.join(', '),
            '] first but was called with',
            R.nth(0, this.subject.getCallHistory())
        ];

        return this.assert(
            R.equals(
                Array.prototype.slice.call(arguments),
                R.nth(0, this.subject.getCallHistory())
            ));
    };

    toHaveBeenCalledWithLast = function (...args: any[]): boolean {
        checkType('Spy', this.subject);
        let argsArray: Array<string> = new Array<string>();
        for (let p in arguments) {
            if (arguments.hasOwnProperty(p)) {
                argsArray.push(arguments[p]);
            }
        }
        this.expected = arguments;
        this.failureDetails = [
            'Expected', 'spy',
            'to have been called with [',
            argsArray.join(', '),
            '] last but was called with',
            R.last(this.subject.getCallHistory())
        ];
        return this.assert(
            R.equals(
                Array.prototype.slice.call(arguments),
                R.last(this.subject.getCallHistory())
            ));
    };

    assert = (equalityTest: boolean): boolean => {
        if (this.isNot ? equalityTest : !equalityTest) {

            Reporter.report(new Report([this.des], MessageType.ERROR));

            if (this.isNot) {
                this.failureDetails[2] = 'not ' + this.failureDetails[2];
            }
            this.failureMessages.push(
                new Report(
                    this.failureDetails,
                    MessageType.COMPARISON
                )
            );

            Counter.incrementFailCount();
            try {
                throw new Error('Assertion error');
            }

            catch (error) {
                let prettyError = new PrettyError();
                prettyError.skipPackage('bed-rock');
                prettyError.appendStyle(ErrorStyle);

                let prettyTrace = prettyError.render(error);
                failureList.push(new FailureReport(
                    this.des,
                    (failureList.length + 1) + ') ' + this.contextChain.join(' => ') + ' => ' + this.des + ': ',
                    error.message,
                    this.failureMessages,
                    prettyTrace
                ));
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