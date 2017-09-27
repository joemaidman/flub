import Expectation from './Expectation';
import MessageType from './MessageType';
import Reporter from './Reporter';
import Report from './Report';
import Counter from './Counter';
import Spy from './Spy';
import Hooks from './Hooks';

export class branch {
    contexts: Array<any> = new Array<any>();
}

let currentDescription: string;

export const context = (des: string, context: Function): void => {
    Reporter.getInstance().report(
        new Report(des, levelType(), Counter.getDepth())
    );
    Counter.incrementDepth();
    context();
    Counter.decrementDepth();
}

export const test = (des: string, tests: () => any): void => {
    Hooks.runHooks('setupEachHooks');
    currentDescription = des;
    tests();
    Hooks.runHooks('tearDownEachHooks');
}

export const expect = (subject: any): Expectation => {
    return new Expectation(subject, Counter.getDepth(), currentDescription);
}

export const setup = (func: Function): void => {
    Hooks.addHook('setuphHooks', Counter.getDepth(), func);
}

export const setupEach = (func: Function): void => {
    Hooks.addHook('setupEachHooks', Counter.getDepth(), func);
}

export const tearDownEach = (func: Function): void => {
    Hooks.addHook('tearDownEachHooks', Counter.getDepth(), func);
}

export const tearDown = (func: Function): void => {
    Hooks.addHook('tearDownHooks', Counter.getDepth(), func);
}

export const spy = (target: any, functionName: string): Spy => {
    const spy: Spy = new Spy(target, target[functionName]);
    Spy.getSpyList().push(
        spy
    );
    return spy;
}

export const stub = (target: any, functionName: string) => {

}

const levelType = (): MessageType => {
    return Counter.getDepth() === 0 ? MessageType.ROOT : MessageType.DEFAULT;
}