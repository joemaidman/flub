import { expect } from 'chai';

import { checkType } from './check-type';

describe('checkType', () => {
    describe('GIVEN it is passed an object of the permitted types', () => {
        it('THEN it returns true', () => {
            expect(checkType('String', 'test')).to.equal(true);
        });
    });
    describe('GIVEN it is passed an object not of the permitted types', () => {
        it('THEN is throws an error', () => {
            try {
                checkType('test', 1);
            } catch (e) {
                expect(e.message).to.equal(
                    'Subject is of type Number not of type test'
                );
            }
        });
    });
});
