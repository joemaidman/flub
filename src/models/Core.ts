import Expectation from './Expectation'
import MessageType from './MessageType'
import Reporter from './Reporter'
import testCount from '../Bedrock'

let depth: number = 0;
let currentDescription: string;

export const context = (des: string, context: Function): void => {
    Reporter.getInstance().report(des, levelType(), depth)
    ++depth;
    context();
    --depth;
}

export const test = (des: string, tests: () => any): void => {
    currentDescription = des;
    tests();
}

export const expect = (subject: any): Expectation => {
    global['testCount']++;
    return new Expectation(subject, depth, currentDescription);
}

const levelType = (): MessageType => {
    return depth === 0 ? MessageType.ROOT : MessageType.DEFAULT;
}

