import Expectation from './Expectation';
import MessageType from './MessageType';
import Reporter from './Reporter';
import Report from './Report';
import * as Counter from './Counter';
import Spy from './Spy';
import Hooks from './Hooks';

let currentDescription: string;
let hooks: Hooks = new Hooks();

export const context = (des: string, context: Function): void => {
    Reporter.report(
        new Report(des, levelType())
    );
    Counter.incrementDepth();
    context();
    Counter.decrementDepth();
    Hooks.runHook('tearDownHooks', Counter.depth);
    Hooks.removeHook('setupEachHooks', Counter.depth);
    Hooks.removeHook('tearDownHooks', Counter.depth);
    Hooks.removeHook('tearDownEachHooks', Counter.depth);
}

export const test = (des: string, tests: () => any): void => {
    Hooks.runHooks('setupEachHooks');
    currentDescription = des;
    Counter.incrementTestCount();
    tests();
    Hooks.runHooks('tearDownEachHooks');
}

export const expect = (subject: any): Expectation => {
    return new Expectation(subject, currentDescription);
}

export const setup = (func: Function): void => {
   func();
}

export const setupEach = (func: Function): void => {
    Hooks.addHook('setupEachHooks', func);
}

export const tearDownEach = (func: Function): void => {
    Hooks.addHook('tearDownEachHooks', func);
}

export const tearDown = (func: Function): void => {
    Hooks.addHook('tearDownHooks', func);
}

export const spy = (target: any, functionName: string): Spy => {
    const spy: Spy = new Spy(target, target[functionName]);
    return spy;
}

const levelType = (): MessageType => {
    return Counter.depth === 0 ? MessageType.ROOT : MessageType.DEFAULT;
}