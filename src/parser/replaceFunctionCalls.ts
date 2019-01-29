import * as Estraverse from 'estraverse';

import { createAbstractSyntaxTree } from './createAbstractSyntaxTree';
import { generateCode } from './generateCode';

export const replaceFunctionCalls = (code: string, currentName: string, newName: string): string => {
  const abstractSyntaxTree: any = createAbstractSyntaxTree(code);
  Estraverse.traverse(abstractSyntaxTree, {
      enter: function (node: any) {
          if (node.type === 'CallExpression' && node.callee.name === currentName) {
              node.callee.name = newName;
          }
      }
  });
  return generateCode(abstractSyntaxTree);
};