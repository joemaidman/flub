import { replaceFunctionCalls } from './replaceFunctionCalls';
import {
    outputCodeWithTestsIgnored,
    inputCodeWithNormalTests,
} from '../../test/resources/CodeSamples';

describe('GIVEN replaceFunctionCalls', () => {
    it('THEN it returns a string with function calls replaced', () => {
        expect(
            replaceFunctionCalls(inputCodeWithNormalTests, 'test', 'xtest')
        ).toEqual(outputCodeWithTestsIgnored);
    });
});
