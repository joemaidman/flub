import HooksManager from '../hooks/hooks-manager';
import { Counter } from '../counter';
import ContextChain from '../context-chain/context-chain';

export const test = (des: string, tests: () => any): void => {
    HooksManager.runHooks('setupEachHooks');
    ContextChain.currentDescription = des;
    Counter.incrementTestCount();
    tests();
    HooksManager.runHooks('teardownEachHooks');
};
