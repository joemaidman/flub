import * as Estraverse from 'estraverse';

import { createAbstractSyntaxTree } from './create-abstract-syntax-tree';
import { generateCode } from './generate-code';
import { NodeTypes } from './node-types';

export const replaceFunctionCalls = (
    code: string,
    currentName: string,
    newName: string
): string => {
    const abstractSyntaxTree: any = createAbstractSyntaxTree(code);
    Estraverse.traverse(abstractSyntaxTree, {
        enter: function (node: any) {
            if (
                node.type === NodeTypes.CALL_EXPRESSION &&
                node.callee.name === currentName
            ) {
                node.callee.name = newName;
            }
        },
    });
    return generateCode(abstractSyntaxTree);
};
