import Expectation from '../expectation/expectation';

describe('GIVEN toBeStringMatching is called', () => {
    let expectation;
    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation('HelloWorld', 'Description');
            expect(expectation.toBeStringMatching(/^Hello/)).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation('HelloWorld', 'Description');
            expect(expectation.toBeStringMatching(/^NotThere/)).toBeFalsy();
        });
    });
});
