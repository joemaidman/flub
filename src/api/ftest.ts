import HooksManager from '../hooks/hooks-manager';
import ContextChain from '../context-chain/context-chain';
import { Counter } from '../counter';

export const ftest = (des: string, tests: () => any): void => {
    HooksManager.runHooks('setupEachHooks');
    ContextChain.currentDescription = des;
    Counter.incrementTestCount();
    tests();
    HooksManager.runHooks('teardownEachHooks');
};
