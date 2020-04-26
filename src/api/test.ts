import HooksManager from '../hooks/HookManager';
import { Counter } from '../counter';
import ContextChain from '../context-chain/contextChain';

export const test = (des: string, tests: () => any): void => {
    HooksManager.runHooks('setupEachHooks');
    ContextChain.currentDescription = des;
    Counter.incrementTestCount();
    tests();
    HooksManager.runHooks('tearDownEachHooks');
};
