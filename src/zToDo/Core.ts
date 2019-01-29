// Public interface

import Expectation from '../expectation/Expectation';
import MessageType from './MessageType';
import Reporter from './Reporter';
import Report from './Report';
import * as Counter from '../counter/Counter';
import Spy from '../spy/Spy';
import Hooks from './Hooks';
import ContextChain from './ContextChain';

export let currentTestFocused: boolean = false;
export const testSummary = new Array<Report>();
export const testSummaryFocused = new Array<Report>();
export let currentDescription: string;
export let currentContextIgnored: boolean;

export const context = (des: string, context: Function): void => {
    ContextChain.push(des);
    Reporter.report(new Report(des, levelType()));
    Counter.incrementDepth();
    context();
    Counter.decrementDepth();
    Hooks.runHook('tearDownHooks', Counter.depth);
    Hooks.removeHook('setupEachHooks', Counter.depth);
    Hooks.removeHook('tearDownHooks', Counter.depth);
    Hooks.removeHook('tearDownEachHooks', Counter.depth);
    ContextChain.pop();
};

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

export const xtest = (des: string, context: Function): void => {
    Counter.incrementIgnoreCount();
    Reporter.report(new Report(des, MessageType.IGNOREDTEST));
 };
 
 export const xcontext = (des: string, context: Function): void => {
    currentContextIgnored = true;
    ContextChain.push(des);
    Reporter.report(new Report(des, MessageType.IGNOREDCONTEXT)); // Dim console
    Counter.incrementDepth();
    context();
    Counter.decrementDepth();
    Hooks.runHook('tearDownHooks', Counter.depth);
    Hooks.removeHook('setupEachHooks', Counter.depth);
    Hooks.removeHook('tearDownHooks', Counter.depth);
    Hooks.removeHook('tearDownEachHooks', Counter.depth);
    ContextChain.pop();
    currentContextIgnored = false;
 };

export const expect = (subject: any): Expectation => {
    return new Expectation(subject, currentDescription, false);
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

export const levelType = (): MessageType => {
    return Counter.depth === 0 ? MessageType.ROOT : MessageType.DEFAULT;
};