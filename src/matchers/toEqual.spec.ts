import Expectation from '../expectation/Expectation';
import { toBeFalsey } from './toBeFalsey';

describe('GIVEN isEqual is called', () => {
    let expectation;
    describe('WHEN a true expectation is made', () => {
        it('THEN it evaluates to true', () => {
            expectation = new Expectation({ a: '1', b: '2' }, 'Description');
            expect(expectation.toEqual({ a: '1', b: '2' })).toBeTruthy();
        });
    });

    describe('WHEN a false expectation is made', () => {
        it('THEN it evaluates to false', () => {
            expectation = new Expectation({ a: '1', b: '2' }, 'Description');
            expect(expectation.toEqual({ a: '2', b: '2' })).toBeFalsy();
        });
    });
});
