import ContextChain from '../context-chain/contextChain';
import Reporter from '../reporter/Reporter';
import Report from '../reporter/Report';
import { Counter } from '../counter';
import HooksManager from '../hooks/HookManager';

export const context = (des: string, context: Function): void => {
    ContextChain.push(des);
    Reporter.report(new Report(des, Counter.levelType()));
    Counter.incrementDepth();
    context();
    Counter.decrementDepth();
    HooksManager.runHook('tearDownHooks', Counter.depth);
    HooksManager.removeHook('setupEachHooks', Counter.depth);
    HooksManager.removeHook('tearDownHooks', Counter.depth);
    HooksManager.removeHook('tearDownEachHooks', Counter.depth);
    ContextChain.pop();
};
