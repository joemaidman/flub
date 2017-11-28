import { expect } from 'chai';
import * as sinon from 'sinon';
import { Program } from 'esprima';
import { CallExpression } from 'estree';

import {
    replaceFunctionCalls,
    scanTreeForFunction,
    replaceChildFunctionCalls
} from '../../src/models/Parser';
import {
    inputCodeWithNormalTests,
    inputSimpleCodeWithFocusedContexts,
    outputCodeWithTestsIgnored,
    outputSimpleCodeWithChildContextsIgnored,
    t1,
    t2
} from '../resources/CodeSamples';

describe('GIVEN replaceFunctionCalls', () => {

    it('THEN it returns a string with function calls replaced', () => {
        expect(replaceFunctionCalls(inputCodeWithNormalTests, 'test', 'xtest')).to.equal(outputCodeWithTestsIgnored);
    });

});

describe('GIVEN scanAbstractSyntaxTreeForFunction', () => {

    it('THEN it returns the count of tree nodes satisfying the name passed', () => {
        expect(scanTreeForFunction(inputCodeWithNormalTests, 'test')).to.equal(1);
    });

});

describe('GIVEN replaceChildFunctionCalls', () => {

    it('THEN it returns a string with node child function calls replaced', () => {
        let sanitisedCode: string;
        sanitisedCode = replaceChildFunctionCalls(inputSimpleCodeWithFocusedContexts, 'xcontext', 'context', 'xcontext');
        sanitisedCode = replaceChildFunctionCalls(sanitisedCode, 'xcontext', 'test', 'xtest');
        expect(sanitisedCode).to.equal(outputSimpleCodeWithChildContextsIgnored);
    });

    it('THEN it returns a string with node child function calls replaced', () => {
        let sanitisedCode: string;
        sanitisedCode = replaceChildFunctionCalls(t1, 'xcontext', 'context', 'xcontext');
        sanitisedCode = replaceChildFunctionCalls(sanitisedCode, 'xcontext', 'test', 'xtest');
        sanitisedCode = replaceChildFunctionCalls(sanitisedCode, 'xcontext', 'ftest', 'xtest');
        expect(sanitisedCode).to.equal(t2);
    });

});