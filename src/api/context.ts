import ContextChain from '../context-chain/context-chain';
import Reporter from '../reporter/reporter';
import Report from '../reporter/report';
import { Counter } from '../counter';
import HooksManager from '../hooks/hooks-manager';

export const context = (des: string, context: Function): void => {
    ContextChain.push(des);
    Reporter.report(new Report(des, Counter.levelType()));
    Counter.incrementDepth();
    context();
    Counter.decrementDepth();
    HooksManager.runHook('teardownHooks', Counter.depth);
    HooksManager.removeHook('setupEachHooks', Counter.depth);
    HooksManager.removeHook('teardownHooks', Counter.depth);
    HooksManager.removeHook('teardownEachHooks', Counter.depth);
    ContextChain.pop();
};
