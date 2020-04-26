import Expectation from '../expectation/expectation';

describe('toBe', () => {
    let expectation;
    describe('GIVEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation(1, 'Description');
            expect(expectation.toBe(1)).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation(1, 'Description');
            expect(expectation.toBe(2)).toBeFalsy();
        });
    });
});
