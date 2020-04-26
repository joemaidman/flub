import Expectation from '../expectation/expectation';

describe('GIVEN toBeBetweenInclusive is called', () => {
    let expectation;
    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation(1, 'Description');
            expect(expectation.toBeBetweenInclusive(1, 2)).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation(1, 'Description');
            expect(expectation.toBeBetweenInclusive(2, 3)).toBeFalsy();
        });
    });
});
