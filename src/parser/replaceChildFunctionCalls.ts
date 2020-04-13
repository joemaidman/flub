import * as Estraverse from 'estraverse';

import { createAbstractSyntaxTree } from './createAbstractSyntaxTree';
import { generateCode } from './generateCode';
import { NodeTypes } from './node-types';

export const replaceChildFunctionCalls = (
    code: string,
    searchName: string,
    oldName: string,
    newName: string
): string => {
    const abstractSyntaxTree: any = createAbstractSyntaxTree(code);
    Estraverse.traverse(abstractSyntaxTree, {
        enter: function(node: any) {
            if (
                node.type === NodeTypes.CALL_EXPRESSION &&
                node.callee.name === searchName
            ) {
                Estraverse.traverse(node, {
                    enter: function(node: any) {
                        if (
                            node.type === NodeTypes.CALL_EXPRESSION &&
                            node.callee.name === oldName
                        ) {
                            node.callee.name = newName;
                        }
                    },
                });
            }
        },
    });
    return generateCode(abstractSyntaxTree);
};
