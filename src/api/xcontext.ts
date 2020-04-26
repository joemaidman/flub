import ContextChain from '../context-chain/contextChain';
import Reporter from '../reporter/Reporter';
import Report from '../reporter/Report';
import MessageType from '../messages/MessageType';
import { Counter } from '../counter';
import HooksManager from '../hooks/HookManager';

export const xcontext = (des: string, context: Function): void => {
    ContextChain.toggleCurrentContextIgnored();
    ContextChain.push(des);
    Reporter.report(new Report(des, MessageType.IGNORED_CONTEXT)); // Dim console
    Counter.incrementDepth();
    context();
    Counter.decrementDepth();
    HooksManager.runHook('tearDownHooks', Counter.depth);
    HooksManager.removeHook('setupEachHooks', Counter.depth);
    HooksManager.removeHook('tearDownHooks', Counter.depth);
    HooksManager.removeHook('tearDownEachHooks', Counter.depth);
    ContextChain.pop();
    ContextChain.toggleCurrentContextIgnored();
};
