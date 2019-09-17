class Spy {
    private target: any;
    private originalFunction: Function;
    private callCount: number;
    private static spyList: Array<Spy>;
    private override: any;
    private callHistory: Array<Array<any>>;

    constructor(target: any, originalFunction: string) {
        this.target = target;
        this.originalFunction = this.target[originalFunction];
        this.callCount = 0;
        this.callHistory = new Array<Array<any>>();
        target[originalFunction] = this.call.bind(this);
        Spy.getSpyList().push(this);
    }

    getCallCount(): number {
        return this.callCount;
    }

    getCallHistory(): Array<Array<any>> {
        return this.callHistory;
    }

    getCallHistoryFormatted(): string {
        return '\n    ' + this.callHistory.join('\n    ');
    }

    andReturn(value: any): any {
        this.override = (): any => {
            return value;
        };
        return this;
    }

    andFake(func: Function): any {
        this.override = func;
        return this;
    }

    call(...args: any[]): any {
        this.callHistory.push(Array.prototype.slice.call(args));
        this.callCount++;

        if (this.override) {
            return this.override(Array.prototype.slice.call(args));
        } else {
            return this.originalFunction(Array.prototype.slice.call(args));
        }
    }

    reset(): void {
        this.callCount = 0;
        this.callHistory = new Array<Array<any>>();
    }

    restore(): void {
        this.target[this.originalFunction.name] = this.originalFunction;
        this.override = null;
        Spy.removeSpy(this.target, this.originalFunction.name);
    }

    static getSpyList(): Array<Spy> {
        return Spy.spyList ? Spy.spyList : (Spy.spyList = new Array<Spy>());
    }

    static removeSpy(target: any, name: string): void {
        Spy.spyList = Spy.getSpyList().filter((spy: Spy): any => {
            spy.target !== target && spy.originalFunction.name !== name;
        });
    }

    static clearSpyList(): void {
        if (Spy.getSpyList()) Spy.spyList = [];
    }

    static restoreAllSpies(): void {
        Spy.getSpyList().forEach((spy: Spy) => {
            if (spy.originalFunction) {
                spy.target[spy.originalFunction.name] = spy.originalFunction;
            }
        });
    }
}

export default Spy;
