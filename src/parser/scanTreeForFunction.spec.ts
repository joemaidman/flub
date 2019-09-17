import { inputCodeWithNormalTests } from '../../test/resources/CodeSamples';
import { scanTreeForFunction } from './scanTreeForFunction';

describe('GIVEN scanTreeForFunction', () => {
    it('THEN it returns the count of tree nodes satisfying the name passed', () => {
        expect(scanTreeForFunction(inputCodeWithNormalTests, 'test')).toEqual(
            1
        );
    });
});
