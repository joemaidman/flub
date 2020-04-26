import Expectation from '../expectation/expectation';

describe('GIVEN toBeTruthy is called', () => {
    let expectation;
    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation(true, 'Description');
            expect(expectation.toBeTruthy()).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation(false, 'Description');
            expect(expectation.toBeTruthy()).toBeFalsy();
        });
    });
});
