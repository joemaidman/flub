import { expect } from 'chai';
import * as sinon from 'sinon';

import { checkType } from '../../src/utilities/utilities';
import MessageType from '../../src/models/MessageType';
import * as Counter from '../../src/counter/Counter';

describe('Utilities', () => {

    describe('checkType', () => {

        describe('GIVEN it is called', () => {

            describe('WHEN it is passed an object of the permitted types', () => {

                it('THEN it returns true', () => {
                    expect(checkType('String', 'test')).to.equal(true);
                });

            });

            describe('WHEN it is passed an object not of the permitted types', () => {

                it('THEN is throws an error', () => {
                    try {
                        checkType('test', 1);
                    }
                    catch (e) {
                        expect(e.message).to.equal('Subject is of type Number not of type test');
                    }
                });

            });

        });
    });

});