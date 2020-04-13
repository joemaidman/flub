import * as Estraverse from 'estraverse';

import { createAbstractSyntaxTree } from './createAbstractSyntaxTree';
import { generateCode } from './generateCode';
import { NodeTypes } from './node-types';

export const replaceFunctionCalls = (
    code: string,
    currentName: string,
    newName: string
): string => {
    const abstractSyntaxTree: any = createAbstractSyntaxTree(code);
    Estraverse.traverse(abstractSyntaxTree, {
        enter: function(node: any) {
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
