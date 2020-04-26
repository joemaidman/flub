import Expectation from '../expectation/expectation';

describe('GIVEN toThrow', () => {
    let expectation;
    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation(() => {
                throw 'Error: Test error';
            }, 'Description');
            expect(expectation.toThrow('Error: Test error')).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation(() => { }, 'Description');
            expect(expectation.toThrow('Test error')).toBeFalsy();
        });
    });
});
