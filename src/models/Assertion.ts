import Reporter from './Reporter'
import MessageType from './MessageType'

export default class Assertion {
    subject: any;
    expected: any;
    counter: number;
    des: string;

    constructor(subject: any, counter: number, des: string) {
        this.subject = subject;
        this.counter = counter;
        this.des = des;
    }

    isEqual = (objectToMatch: any): boolean => {
        this.expected = objectToMatch;
        return this.assert(this.subject.toString() === objectToMatch.toString());
    }

    isEmptyString = (): boolean => {
        this.expected = "";
        return this.assert(this.subject === "")
    };

    isDefined = (): boolean => {
        this.expected = Object;
        return this.assert(typeof (this.subject) !== "undefined");
    }


    isInstanceOf = function (type: any): boolean {
        this.expected = type.toString();
        return this.assert(this.subject.constructor.name === type.toString());
    }

    isPrimitiveOf = function (type: any): boolean {
        this.expected = type.toString;
        return this.assert(this.subject.typeof(type));
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