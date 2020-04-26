import Expectation from '../expectation/expectation';
let expectation;
describe('GIVEN toContain is called on an Array', () => {
    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation([1, 2, 3], 'Description');
            expect(expectation.toContain(1)).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation([1, 2, 3], 'Description');
            expect(expectation.toContain(4)).toBeFalsy();
        });
    });
});

describe('GIVEN toContain is called on an Set', () => {
    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation(new Set().add(1), 'Description');
            expect(expectation.toContain(1)).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation(new Set().add(1), 'Description');
            expect(expectation.toContain(2)).toBeFalsy();
        });
    });
});

describe('GIVEN toContain is called on an object', () => {
    it('THEN it throws an error', () => {
        expectation = new Expectation({ a: 1, b: 2 }, 'Description');

        try {
            expectation.toContain(1);
        } catch (e) {
            expect(e.message).toEqual(
                'Subject is of type Object not of type Array/Set/Map/String'
            );
        }
    });
});
