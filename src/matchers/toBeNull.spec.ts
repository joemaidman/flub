import Expectation from '../expectation/Expectation';

describe('GIVEN toBeNull is called', () => {
    let expectation;
    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation(null, 'Description');
            expect(expectation.toBeNull()).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation(1, 'Description');
            expect(expectation.toBeNull()).toBeFalsy();
        });
    });
});
