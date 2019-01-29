import * as Estraverse from 'estraverse';

import { createAbstractSyntaxTree } from './createAbstractSyntaxTree';

export const scanTreeForFunction = (code: string, nodeName: string): number => {
  const abstractSyntaxTree: any = createAbstractSyntaxTree(code);
  let nodeCount = 0;
  Estraverse.traverse(abstractSyntaxTree, {
      enter: function (node: any) {
          if (node.type === 'CallExpression' && node.callee.name === nodeName) {
              nodeCount++;
          }
      }
  });
  return nodeCount;
};