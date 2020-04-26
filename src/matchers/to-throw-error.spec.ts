import Expectation from '../expectation/expectation';

describe('GIVEN toThrowError', () => {
    let expectation: Expectation;
    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation(() => {
                throw new Error('Error: Test error');
            }, 'Description');
            expect(
                expectation.toThrowError(new Error(), 'Error: Test error')
            ).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation(() => { }, 'Description');
            expect(
                expectation.toThrowError('Error', 'Error: Test error')
            ).toBeFalsy();
        });
    });
});
