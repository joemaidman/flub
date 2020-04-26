import * as Esprima from 'esprima';
import { Program } from 'esprima';

export const createAbstractSyntaxTree = (code: string): Program => {
    return Esprima.parseModule(code);
};
