import Expectation from '../expectation/Expectation';

describe('GIVEN toHaveLength is called', () => {
    let expectation;
    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation([1, 2, 3], 'Description');
            expect(expectation.toHaveLength(3)).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation([1, 2, 3], 'Description');
            expect(expectation.toHaveLength(2)).toBeFalsy();
        });
    });
});
