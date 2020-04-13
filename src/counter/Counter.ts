import MessageType from '../messages/MessageType';

export class Counter {
    static testCount: number = 0;
    static passCount: number = 0;
    static failCount: number = 0;
    static ignoreCount: number = 0;
    static depth: number = 0;

    static incrementDepth() {
        Counter.depth++;
    }

    static decrementDepth() {
        if (Counter.depth > 0) {
            Counter.depth--;
        }
    }

    static incrementTestCount() {
        Counter.testCount++;
    }

    static incrementPassCount() {
        Counter.passCount++;
    }

    static incrementFailCount() {
        Counter.failCount++;
    }

    static incrementIgnoreCount() {
        Counter.ignoreCount++;
    }
    static reset() {
        Counter.testCount = 0;
        Counter.passCount = 0;
        Counter.failCount = 0;
        Counter.ignoreCount = 0;
        Counter.depth = 0;
    }

    static levelType(): MessageType {
        return Counter.depth === 0 ? MessageType.ROOT : MessageType.DEFAULT;
    }
}
