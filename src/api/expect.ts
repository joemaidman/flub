import Expectation from '../expectation/expectation';
import ContextChain from '../context-chain/context-chain';

export const expect = (subject: any): Expectation => {
    return new Expectation(subject, ContextChain.currentDescription, false);
};
