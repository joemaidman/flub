export const inputCodeWithNormalTests: string = `context('Context', () => {test('Test', () => { });});`;

export const inputSimpleCodeWithFocusedContexts: string = `xcontext('Parent Context', () => {context('Child Context',() => {test('Test', () => {});});});`;

export const outputCodeWithTestsIgnored: string = `context('Context', () => {
    xtest('Test', () => {
    });
});`;

export const outputSimpleCodeWithChildContextsIgnored: string = `xcontext('Parent Context', () => {
    xcontext('Child Context', () => {
        xtest('Test', () => {
        });
    });
});`;

export const codeSampleXContextInput: string = `context('Matchers', () => {
    
        context('Given toEqual', () => {
            xcontext('When you pass 1 and 1', () => {
                ftest('THEN it passes', () => {
                    expect(1).toEqual(1);
                });
            });
            context('When you pass 1 and 2', () => {
                test('THEN it fails', () => {
                    expect(1).toEqual(3);
                });
            });
        });
    
    });
`;

export const codeSampleXContextExpectedOutput: string = `context('Matchers', () => {
    context('Given toEqual', () => {
        xcontext('When you pass 1 and 1', () => {
            xtest('THEN it passes', () => {
                expect(1).toEqual(1);
            });
        });
        context('When you pass 1 and 2', () => {
            test('THEN it fails', () => {
                expect(1).toEqual(3);
            });
        });
    });
});`;
