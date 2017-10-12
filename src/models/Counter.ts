export let testCount: number = 0;
export let passCount: number = 0;
export let failCount: number = 0;
export let depth: number = 0;

export const reset = () => {
    testCount = 0;
    passCount = 0;
    failCount = 0;
}

export const incrementDepth = () => {
    depth++;
}

export const decrementDepth = () => {
    if (depth > 0) {
        depth--;
    }
}

export const incrementTestCount = () => {
    testCount++;
}

export const incrementPassCount = () => {
    passCount++;
}

export const incrementFailCount = () => {
    failCount++;
}