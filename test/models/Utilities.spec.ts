import { expect } from 'chai';
import * as sinon from 'sinon';

import { checkType } from '../../src/models/Utilities'

describe('Utilities', () => {

    describe('checkType', () => {

        describe('WHEN it is passed an object', () => {

            it('THEN it returns true if the object is of the stated type', () => {
                expect(checkType('String', 'test')).to.equal(true);
            });

            it('THEN is throws an error if the obect is not of the stated type', () => {
                try {
                    checkType('test', 1)

                }
                catch (e) {
                    expect(e.message).to.equal('Subject is not a test object');
                }
            });

        });
    });
});