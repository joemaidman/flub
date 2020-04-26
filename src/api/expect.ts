import Expectation from '../expectation/Expectation';
import ContextChain from '../context-chain/contextChain';

export const expect = (subject: any): Expectation => {
    return new Expectation(subject, ContextChain.currentDescription, false);
};
