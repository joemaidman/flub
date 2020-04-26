import * as Estraverse from 'estraverse';

import { createAbstractSyntaxTree } from './create-abstract-syntax-tree';
import { NodeTypes } from './node-types';

export const scanTreeForFunction = (code: string, nodeName: string): number => {
    const abstractSyntaxTree: any = createAbstractSyntaxTree(code);
    let nodeCount = 0;
    Estraverse.traverse(abstractSyntaxTree, {
        enter: function (node: any) {
            if (
                node.type === NodeTypes.CALL_EXPRESSION &&
                node.callee.name === nodeName
            ) {
                nodeCount++;
            }
        },
    });
    return nodeCount;
};
