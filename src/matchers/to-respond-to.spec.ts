import Expectation from '../expectation/expectation';

describe('GIVEN toRespondTo is called', () => {
    let expectation;
    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation('A string', 'Description');
            expect(expectation.toRespondTo('toLowerCase')).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation(1, 'Description');
            expect(expectation.toRespondTo('toLowerCase')).toBeFalsy();
        });
    });
});
