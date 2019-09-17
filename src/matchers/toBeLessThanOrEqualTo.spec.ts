import Expectation from '../expectation/Expectation';

describe('GIVEN toBeLessThanOrEqualTo is called', () => {
    let expectation;
    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation(1, 'Description');
            expect(expectation.toBeLessThanOrEqualTo(1)).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation(1, 'Description');
            expect(expectation.toBeLessThanOrEqualTo(0)).toBeFalsy();
        });
    });
});
