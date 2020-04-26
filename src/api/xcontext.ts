import ContextChain from '../context-chain/context-chain';
import Reporter from '../reporter/reporter';
import Report from '../reporter/report';
import MessageType from '../messages/message-type';
import { Counter } from '../counter';
import HooksManager from '../hooks/hooks-manager';

export const xcontext = (des: string, context: Function): void => {
    ContextChain.toggleCurrentContextIgnored();
    ContextChain.push(des);
    Reporter.report(new Report(des, MessageType.IGNORED_CONTEXT)); // Dim console
    Counter.incrementDepth();
    context();
    Counter.decrementDepth();
    HooksManager.runHook('teardownHooks', Counter.depth);
    HooksManager.removeHook('setupEachHooks', Counter.depth);
    HooksManager.removeHook('teardownHooks', Counter.depth);
    HooksManager.removeHook('teardownEachHooks', Counter.depth);
    ContextChain.pop();
    ContextChain.toggleCurrentContextIgnored();
};
