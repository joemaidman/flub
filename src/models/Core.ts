import Expectation from './Expectation';
import MessageType from './MessageType';
import Reporter from './Reporter';
import Report from './Report';
import * as Counter from './Counter';
import Spy from './Spy';
import Hooks from './Hooks';

let currentDescription: string;
export let currentTestFocused: boolean = false;
export const testSummary = new Array<Report>();
export const testSummaryFocused = new Array<Report>();
let hooks: Hooks = new Hooks();
let currentContextChain: Array<string> = [];
let currentTestDes: string;


export const context = (des: string, context: Function): void => {
    currentContextChain.push(des);
    Reporter.report(new Report(des, levelType()));
    Counter.incrementDepth();
    context();
    Counter.decrementDepth();
    Hooks.runHook('tearDownHooks', Counter.depth);
    Hooks.removeHook('setupEachHooks', Counter.depth);
    Hooks.removeHook('tearDownHooks', Counter.depth);
    Hooks.removeHook('tearDownEachHooks', Counter.depth);
    currentContextChain.pop();
};

export const xcontext = (des: string, context: Function): void => { };

export const test = (des: string, tests: () => any): void => {
    Hooks.runHooks('setupEachHooks');
    currentDescription = des;
    Counter.incrementTestCount();
    tests();
    Hooks.runHooks('tearDownEachHooks');
};

export const ftest = (des: string, tests: () => any): void => {
    Hooks.runHooks('setupEachHooks');
    currentDescription = des;
    Counter.incrementTestCount();
    tests();
    Hooks.runHooks('tearDownEachHooks');
};

export const xtest = (des: string, context: Function): void => { };

export const expect = (subject: any): Expectation => {
    return new Expectation(subject, currentDescription, false, currentContextChain);
};

export const setup = (func: Function): void => {
    func();
};

export const setupEach = (func: Function): void => {
    Hooks.addHook('setupEachHooks', func);
};

export const tearDownEach = (func: Function): void => {
    Hooks.addHook('tearDownEachHooks', func);
};

export const tearDown = (func: Function): void => {
    Hooks.addHook('tearDownHooks', func);
};

export const spy = (target: any, functionName: string): Spy => {
    const spy: Spy = new Spy(target, functionName);
    return spy;
};

const levelType = (): MessageType => {
    return Counter.depth === 0 ? MessageType.ROOT : MessageType.DEFAULT;
};