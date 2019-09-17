import Expectation from '../expectation/Expectation';
import ContextChain from '../context/ContextChain';

export const expect = (subject: any): Expectation => {
    return new Expectation(subject, ContextChain.currentDescription, false);
};
