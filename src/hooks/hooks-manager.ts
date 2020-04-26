class HooksManager {
    private static instance: HooksManager;
    private static setupEachHooks: Array<Function> = new Array<Function>();
    private static teardownEachHooks: Array<Function> = new Array<Function>();
    private static teardownHooks: Array<Function> = new Array<Function>();

    static getHooks(name: string): Array<Function> {
        return HooksManager[name];
    }

    static addHook(name: string, func: Function): void {
        if (HooksManager.getHooks(name)) {
            HooksManager.getHooks(name).push(func);
        }
    }

    static removeHook(name: string, index: number): void {
        if (HooksManager.getHooks(name)) {
            HooksManager.getHooks(name).splice(index);
        }
    }

    static runHooks(name: string): void {
        if (HooksManager.getHooks(name)) {
            HooksManager.getHooks(name).forEach(hook => {
                hook();
            });
        }
    }

    static runHook(name: string, index: number): void {
        if (HooksManager.getHooks(name) && HooksManager.getHooks(name)[index]) {
            HooksManager.getHooks(name)[index]();
        }
    }

    static clearHooks(): void {
        HooksManager.setupEachHooks = new Array<Function>();
        HooksManager.teardownEachHooks = new Array<Function>();
        HooksManager.teardownHooks = new Array<Function>();
    }
}

export default HooksManager;
