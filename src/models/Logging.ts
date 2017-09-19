export const printTestHeader = () => {
    console.log('Bedrock starting...');
    console.log();
}


export const printWatching = () => {
    console.log();
    console.log('Watching files...');
    console.log();
}

export const printTestSummary = (elapsed: any) => {
    console.log();
    console.log("Ran "
        + global['testCount'] +
        " tests in " +
        elapsed.millisecondsTotal +
        " ms");
}
