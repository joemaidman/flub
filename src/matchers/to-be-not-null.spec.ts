import Expectation from '../expectation/expectation';

describe('GIVEN toBeNotNull is called', () => {
    let expectation;
    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation(1, 'Description');
            expect(expectation.toBeNotNull()).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation(null, 'Description');
            expect(expectation.toBeNotNull()).toBeFalsy();
        });
    });
});
