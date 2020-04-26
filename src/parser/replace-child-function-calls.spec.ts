import {
    inputSimpleCodeWithFocusedContexts,
    outputSimpleCodeWithChildContextsIgnored,
    codeSampleXContextInput,
    codeSampleXContextExpectedOutput,
} from '../../test/resources/code-samples';
import { replaceChildFunctionCalls } from './replace-child-function-calls';

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
