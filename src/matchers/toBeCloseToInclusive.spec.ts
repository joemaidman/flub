import Expectation from '../expectation/Expectation';

describe('GIVEN toBeCloseToInclusive is called', () => {
    let expectation;
    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation(1.5, 'Description');
            expect(expectation.toBeCloseToInclusive(1, 0.5)).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation(1.5, 'Description');
            expect(expectation.toBeCloseToInclusive(1, 0.4)).toBeFalsy();
        });
    });
});
