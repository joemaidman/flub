class Counter {

    private testCount: number = 0;
    private passCount: number = 0;
    private failCount: number = 0;
    private depth: number = 0;
    private static instance: Counter;

    static getInstance(): Counter {
        if (!Counter.instance) {
            Counter.instance = new Counter();
        }
        return Counter.instance;
    }

    static resetCount(): void {
        Counter.getInstance().testCount = 0;
        Counter.getInstance().passCount = 0;
        Counter.getInstance().failCount = 0;
    }

    static getDepth(): number {
        return Counter.getInstance().depth;
    }

    static incrementDepth(): number {
        return Counter.getInstance().depth++;
    }

    static decrementDepth(): number {
        return Counter.getInstance().depth--;
    }

    static getTestCount(): number {
        return Counter.getInstance().testCount;
    }

    static getPassCount(): number {
        return Counter.getInstance().passCount;
    }

    static getFailCount(): number {
        return Counter.getInstance().failCount;
    }


    static incrementTestCount(): number {
        return Counter.getInstance().testCount++;
    }

    static incrementPassCount(): number {
        return Counter.getInstance().passCount++;
    }

    static incrementFailCount(): number {
        return Counter.getInstance().failCount++;
    }
}

export default Counter;