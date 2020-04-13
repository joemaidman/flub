import Expectation from '../expectation/Expectation';

describe('GIVEN toBeBetweenExclusive is called', () => {
    let expectation;
    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation(1, 'Description');
            expect(expectation.toBeBetweenExclusive(0, 2)).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation(1, 'Description');
            expect(expectation.toBeBetweenExclusive(0, 1)).toBeFalsy();
        });
    });
});
