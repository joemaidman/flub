export default class ContextChain {
    static chain: Array<string> = new Array<string>();
    static currentDescription: string;
    static currentContextIgnored: boolean;

    static pop(): void {
        ContextChain.chain.pop();
    }

    static push(contextDescription: string): void {
        ContextChain.chain.push(contextDescription);
    }

    static reset() {
        ContextChain.chain.length = 0;
    }
}
