import { expect } from 'chai';
import * as sinon from 'sinon';

import { checkType } from '../../src/models/Utilities'

describe('Utilities', () => {

    describe('WHEN it is passed an object', () => {

        it('THEN it returns true if the object is of the stated type', () => {
            // console.log('test'.constructor.name)
            expect(checkType('String', 'test')).not.to.throw();
        });

        it('THEN is returns false if the obect is not of hte stated type', () => {
            expect(checkType('test', 1)).to.throw(new Error('Subject is not a test object'));

        });

    });

});