import { expect } from 'chai';
import * as sinon from 'sinon';

import {Fail, fails} from '../../src/models/Failure'

describe('Fail', () =>{

    describe('GIVEN a Fail has been created', () => {
        let fail = new Fail('Test des','Test comp', ['Test stack A', 'Test stack B']);

        it('THEN it should be added to the list of all fails',() => {
            expect(fails).to.include(fail);
        });

        it('THEN getDes returns the correct des',() => {
            expect(fail.getDes()).to.equal('Test des');
        });

        it('THEN getComp returns the correct comp',() => {
            expect(fail.getComp()).to.equal('Test comp');
        });

        it('THEN getStack returns the correct stack',() => {
            expect(fail.getStack()).to.deep.equal(['Test stack A', 'Test stack B']);
        });

    })

});