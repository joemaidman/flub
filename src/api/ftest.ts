import HooksManager from '../hooks/HookManager';
import ContextChain from '../context-chain/ContextChain';
import { Counter } from '../counter';

export const ftest = (des: string, tests: () => any): void => {
    HooksManager.runHooks('setupEachHooks');
    ContextChain.currentDescription = des;
    Counter.incrementTestCount();
    tests();
    HooksManager.runHooks('tearDownEachHooks');
};
