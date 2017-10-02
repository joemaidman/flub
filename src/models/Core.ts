import Expectation from './Expectation';
import MessageType from './MessageType';
import Reporter from './Reporter';
import Report from './Report';
import Counter from './Counter';
import Spy from './Spy';
import Hooks from './Hooks';

let currentDescription: string;
let hooks: Hooks = new Hooks();

export const context = (des: string, context: Function): void => {
    Reporter.getInstance().report(
        new Report(des, levelType(), Counter.getDepth())
    );
    Counter.incrementDepth();
    context();
    Counter.decrementDepth();
    Hooks.runHook('tearDownHooks', Counter.getDepth());
    Hooks.removeHook('setupEachHooks', Counter.getDepth());
    Hooks.removeHook('tearDownHooks', Counter.getDepth());
    Hooks.removeHook('tearDownEachHooks', Counter.getDepth());
}

export const test = (des: string, tests: () => any): void => {
    Hooks.runHooks('setupEachHooks');
    currentDescription = des;
    Counter.incrementTestCount();
    tests();
    Hooks.runHooks('tearDownEachHooks');
}

export const expect = (subject: any): Expectation => {
    return new Expectation(subject, Counter.getDepth(), currentDescription);
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
    Spy.getSpyList().push(
        spy
    );
    return spy;
}

const levelType = (): MessageType => {
    return Counter.getDepth() === 0 ? MessageType.ROOT : MessageType.DEFAULT;
}