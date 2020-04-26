import Spy from '../spy/spy';
import Expectation from '../expectation/expectation';

describe('GIVEN toHaveBeenCalled', () => {
    let testSpy: Spy;
    let expectation;

    beforeEach(() => {
        testSpy = new Spy(Math, 'round');
    });

    afterAll(() => {
        testSpy.restore();
    });

    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            Math.round(1);
            expectation = new Expectation(testSpy, 'Description');
            expect(expectation.toHaveBeenCalled(1)).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation(testSpy, 'Description');
            expect(expectation.toHaveBeenCalled(2)).toBeFalsy();
        });
    });

    describe('WHEN the subject is not a spy ', () => {
        it('THEN it throws an error', () => {
            expectation = new Expectation(1, 'Description');

            try {
                expectation.toHaveBeenCalled(1);
            } catch (e) {
                expect(e.message).toEqual(
                    'Subject is of type Number not of type Spy'
                );
            }
        });
    });
});
