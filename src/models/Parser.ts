import * as Esprima from 'esprima';
import * as Estraverse from 'estraverse';
import * as ESTree from 'estree';
import * as escodegen from 'escodegen';
import * as R from 'ramda';
import { Program } from 'esprima';

export const createAbstractSyntaxTree = (code: string): Program => {
    return Esprima.parseModule(code);
};

export const generateCode = (tree: Program): string => {
    return escodegen.generate(tree);
};

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

export const replaceChildFunctionCalls = (code: string, searchName: string, oldName: string, newName: string): string => {
    const abstractSyntaxTree: any = createAbstractSyntaxTree(code);
    Estraverse.traverse(abstractSyntaxTree, {
        enter: function (node: any) {
            if (node.type === 'CallExpression' && node.callee.name === searchName) {
                Estraverse.traverse(node, {
                    enter: function (node: any) {
                        if (node.type === 'CallExpression' && node.callee.name === oldName) {
                            node.callee.name = newName;
                        }
                    }
                });
            }
        }
    });
    return generateCode(abstractSyntaxTree);
};

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