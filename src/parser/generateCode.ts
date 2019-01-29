import * as escodegen from 'escodegen';
import { Program } from 'esprima';

export const generateCode = (tree: Program): string => {
  return escodegen.generate(tree);
};