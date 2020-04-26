import { inputCodeWithNormalTests } from '../../test/resources/code-samples';
import { scanTreeForFunction } from './scan-tree-for-function';

describe('GIVEN scanTreeForFunction', () => {
    it('THEN it returns the count of tree nodes satisfying the name passed', () => {
        expect(scanTreeForFunction(inputCodeWithNormalTests, 'test')).toEqual(
            1
        );
    });
});
