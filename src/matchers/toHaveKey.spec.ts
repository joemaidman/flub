import Expectation from '../expectation/Expectation';
let expectation;
describe('GIVEN toHaveKey is called on a Map', () => {
    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation(new Map().set(1, 2), 'Description');
            expect(expectation.toHaveKey(1)).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation(new Map().set(1, 2), 'Description');
            expect(expectation.toHaveKey(4)).toBeFalsy();
        });
    });
});

describe('GIVEN toHaveKey is called on an Object', () => {
    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation({ a: 1, b: 2 }, 'Description');
            expect(expectation.toHaveKey('a')).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation({ a: 1, b: 2 }, 'Description');
            expect(expectation.toHaveKey('c')).toBeFalsy();
        });
    });
});
