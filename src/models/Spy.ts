export default class Spy {
    private target: any;
    private originalFunction: Function;
    private callCount: number;
    private static spyList: Array<Spy>;
    private override: any;
    private callHistory: Array<Array<any>>;

    constructor(target: any, originalFunction: Function) {
        this.target = target;
        this.originalFunction = originalFunction;
        this.callCount = 0;
        this.callHistory = new Array<Array<any>>();
        this.target[originalFunction.name] = this.call.bind(this);
    }

    restore(): void {
        this.target[this.originalFunction.name] = this.originalFunction;
        Spy.removeSpyFromList(this.target, this.originalFunction.name);
    }

    getCallCount(): number {
        return this.callCount;
    }

    getCallHistory(): Array<Array<any>> {
        return this.callHistory;
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

    call(): void {
        this.callHistory.push(Array.prototype.slice.call(arguments));
        this.callCount++;
        return this.override ? this.override() : this.originalFunction();
    }

    static getSpyList(): Array<Spy> {
        return Spy.spyList
            ? Spy.spyList
            : Spy.spyList = new Array<Spy>();
    }

    static removeSpyFromList(target: any, name: string): void {
        Spy.spyList = Spy.spyList.filter((spy: Spy): any => {
            spy.target !== target && spy.originalFunction.name !== name;
        });
    }

    static clearSpyList(): void {
        if (Spy.spyList) Spy.spyList = [];
    }

    static restoreAllSpies(): void {
        Spy.getSpyList().forEach((spy: Spy) => {
            spy.target[spy.originalFunction.name] = spy.originalFunction;
        })
    }

}