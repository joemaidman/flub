import { replaceFunctionCalls } from './replace-function-calls';
import {
    outputCodeWithTestsIgnored,
    inputCodeWithNormalTests,
} from '../../test/resources/code-samples';

describe('GIVEN replaceFunctionCalls', () => {
    it('THEN it returns a string with function calls replaced', () => {
        expect(
            replaceFunctionCalls(inputCodeWithNormalTests, 'test', 'xtest')
        ).toEqual(outputCodeWithTestsIgnored);
    });
});
