import {
    inputSimpleCodeWithFocusedContexts,
    outputSimpleCodeWithChildContextsIgnored,
    codeSampleXContextInput,
    codeSampleXContextExpectedOutput,
} from '../../test/resources/CodeSamples';
import { replaceChildFunctionCalls } from './replaceChildFunctionCalls';

describe('GIVEN replaceChildFunctionCalls', () => {
    it('THEN it returns a string with node child function calls replaced', () => {
        let sanitisedCode: string;
        sanitisedCode = replaceChildFunctionCalls(
            inputSimpleCodeWithFocusedContexts,
            'xcontext',
            'context',
            'xcontext'
        );
        sanitisedCode = replaceChildFunctionCalls(
            sanitisedCode,
            'xcontext',
            'test',
            'xtest'
        );
        expect(sanitisedCode).toEqual(outputSimpleCodeWithChildContextsIgnored);
    });

    it('THEN it returns a string with node child function calls replaced', () => {
        let sanitisedCode: string;
        sanitisedCode = replaceChildFunctionCalls(
            codeSampleXContextInput,
            'xcontext',
            'context',
            'xcontext'
        );
        sanitisedCode = replaceChildFunctionCalls(
            sanitisedCode,
            'xcontext',
            'test',
            'xtest'
        );
        sanitisedCode = replaceChildFunctionCalls(
            sanitisedCode,
            'xcontext',
            'ftest',
            'xtest'
        );
        expect(sanitisedCode).toEqual(codeSampleXContextExpectedOutput);
    });
});
