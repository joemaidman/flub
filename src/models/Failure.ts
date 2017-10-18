export const fails = new Array<Fail>();

export class Fail {
    des: string;
    comp: string;
    stack: Array<string>;

    constructor(des: string, comp: string, stack: Array<string>) {
        this.des = des;
        this.comp = comp;
        this.stack = stack;
        fails.push(this);
    }

    getDes = (): string => {
        return this.des;
    }

    getComp = (): string => {
        return this.comp;
    }

    getStack = (): Array<string> => {
        return this.stack;
    }

}