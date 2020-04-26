import {
    toEqual,
    toBeDefined,
    toBe,
    toBeUndefined,
    toBeNotNull,
    toBeNull,
    toBeGreaterThanOrEqualTo,
    toBeLessThanOrEqualTo,
    toBeGreaterThan,
    toBeLessThan,
    toBeBetweenExclusive,
    toBeCloseToInclusive,
    toBeCloseToExclusive,
    toBeTypeOf,
    toRespondTo,
    toHaveLength,
    toBeFalsey,
    toBeTruthy,
    toBeStringContaining,
    toBeStringMatching,
    toContain,
    toThrow,
    toThrowError,
    toHaveKey,
    toHaveBeenCalled,
    toHaveBeenCalledWith,
    toHaveBeenCalledWithFirst,
    toHaveBeenCalledWithLast,
    toBeBetweenInclusive,
} from '../matchers';
import ContextChain from '../context-chain/contextChain';
import Report from '../reporter/Report';

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
        this.not.throwsArgs = Array.prototype.slice.call(arguments);
        return this;
    };

    // Matchers
    toBe = toBe;
    toEqual = toEqual;
    toBeDefined = toBeDefined;
    toBeUndefined = toBeUndefined;
    toBeNotNull = toBeNotNull;
    toBeNull = toBeNull;
    toBeGreaterThanOrEqualTo = toBeGreaterThanOrEqualTo;
    toBeLessThanOrEqualTo = toBeLessThanOrEqualTo;
    toBeGreaterThan = toBeGreaterThan;
    toBeLessThan = toBeLessThan;
    toBeBetweenInclusive = toBeBetweenInclusive;
    toBeBetweenExclusive = toBeBetweenExclusive;
    toBeCloseToInclusive = toBeCloseToInclusive;
    toBeCloseToExclusive = toBeCloseToExclusive;
    toBeTypeOf = toBeTypeOf;
    toRespondTo = toRespondTo;
    toHaveLength = toHaveLength;
    toBeFalsey = toBeFalsey;
    toBeTruthy = toBeTruthy;
    toBeStringContaining = toBeStringContaining;
    toBeStringMatching = toBeStringMatching;
    toContain = toContain;
    toThrow = toThrow;
    toThrowError = toThrowError;
    toHaveKey = toHaveKey;
    toHaveBeenCalled = toHaveBeenCalled;
    toHaveBeenCalledWith = toHaveBeenCalledWith;
    toHaveBeenCalledWithFirst = toHaveBeenCalledWithFirst;
    toHaveBeenCalledWithLast = toHaveBeenCalledWithLast;
}

export default Expectation;
