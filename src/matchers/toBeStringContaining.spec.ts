import Expectation from '../expectation/Expectation';
let expectation;
describe('GIVEN toBeStringContaining (case insensitive) is called', () => {
    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation('HelloWorld', 'Description');
            expect(expectation.toBeStringContaining('World')).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation('HelloWorld', 'Description');
            expect(expectation.toBeStringContaining('NotThere')).toBeFalsy();
        });
    });
});

describe('GIVEN toBeStringContaining (case sensitive) is called', () => {
    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation('HelloWorld', 'Description');
            expect(
                expectation.toBeStringContaining('World', true)
            ).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation('HelloWorld', 'Description');
            expect(expectation.toBeStringContaining('world', true)).toBeFalsy();
        });
    });
});
