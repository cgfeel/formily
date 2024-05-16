import { autorun, batch, define, observable, reaction } from "@formily/reactive";

// batch 批量操作普通用法
describe("normal batch", () => {
    // 不使用 batch 每次修改 observable 都会响应一次
    test("no batch", () => {
        const obs = observable({ aa: { bb: 123 } });
        const handler = jest.fn();

        autorun(() => handler(obs.aa.bb));
        expect(handler).toHaveBeenCalledTimes(1);

        obs.aa.bb = 111;
        obs.aa.bb = 222;
        expect(handler).toHaveBeenCalledTimes(3);

        obs.aa.bb = 333;
        obs.aa.bb = 444;
        expect(handler).toHaveBeenCalledTimes(5);
    });

    // batch 内部所有修改只记录一次响应
    test("batch", () => {
        const obs = observable({ aa: { bb: 123 } });
        const handler = jest.fn();

        autorun(() => handler(obs.aa.bb));
        expect(handler).toHaveBeenCalledTimes(1);

        obs.aa.bb = 111;
        obs.aa.bb = 222;
        expect(handler).toHaveBeenCalledTimes(3);
        expect(handler).toHaveBeenLastCalledWith(222);

        batch(() => {
            obs.aa.bb = 333;
            obs.aa.bb = 444;
        });
        expect(handler).toHaveBeenCalledTimes(4);
        expect(handler).toHaveBeenLastCalledWith(444);
    });

    // 在 track 函数中使用 batch
    test("batch track", () => {
        const obs = observable({ 
            aa: { bb: { cc: 123 } }, 
            cc: 1,
        });

        // 这里会和 action 不同，batch 会收集依赖，每次都响应依赖对象更新
        const handler = jest.fn();
        autorun(() => batch(() => {
            handler(obs.aa.bb);
            obs.cc += 20;
        }));

        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toEqual(21);

        // 更新数据会继续响应
        obs.aa.bb = { cc: 321 };
        expect(handler).toHaveBeenCalledTimes(2);
        expect(obs.cc).toEqual(41);
    });

    // batch.bound 绑定一个批量操作
    test("batch.bound", () => {
        const obs = observable({ aa: { bb: 123 } });
        const setData = batch.bound!(() => {
            obs.aa.bb = 333;
            obs.aa.bb = 444;
        });
        
        const handler = jest.fn();
        autorun(() => handler(obs.aa.bb));

        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.aa.bb).toBe(123);

        obs.aa.bb = 111;
        obs.aa.bb = 222;
        expect(handler).toHaveBeenCalledTimes(3);
        expect(obs.aa.bb).toBe(222);

        // 批量操作增加 1 次
        setData();
        batch(() => {});
        expect(handler).toHaveBeenCalledTimes(4);
        expect(obs.aa.bb).toBe(444);
    });

    // 在 track 函数中使用 batch.bound
    test("batch.bound track", () => {
        const obs = observable({ 
            aa: { bb: 123 }, 
            cc: 1
        });

        const handler = jest.fn();
        autorun(() => {
            const action = batch.bound!(() => {
                handler(obs.aa.bb);
                obs.cc += 20;
            });
            action();
        });

        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);

        obs.aa.bb = 321;
        expect(handler).toHaveBeenCalledTimes(2);
        expect(obs.cc).toBe(41);
    });

    // batch.scope 批量操作中分批执行
    test("batch.scope", () => {
        const obs = observable<Partial<Record<string, number|string>>>({});
        const handler = jest.fn();

        // 初始化执行 1 次
        autorun(() => handler(obs.aa, obs.bb, obs.cc, obs.dd));
        expect(handler).toHaveBeenCalledTimes(1);

        batch(() => {
            // 分批 +1
            batch.scope!(() => {
                obs.aa = 123;
            });
            // 分批 +1
            batch.scope!(() => {
                obs.cc = "ccccc";
            });
            // 批量操作 +1
            obs.bb = 321;
            obs.dd = "ddddd";
        });
        expect(handler).toHaveBeenCalledTimes(4);
        expect(handler).toHaveBeenNthCalledWith(1, undefined, undefined, undefined, undefined);
        expect(handler).toHaveBeenNthCalledWith(2, 123, undefined, undefined, undefined);
        expect(handler).toHaveBeenNthCalledWith(3, 123, undefined, "ccccc", undefined);
        expect(handler).toHaveBeenNthCalledWith(4, 123, 321, "ccccc", "ddddd");
    });

    // batch.scope.bound 分批绑定批量操作
    test("batch.scope bound", () => {
        const obs = observable<Partial<Record<string, number | string>>>({});
        const handler = jest.fn();

        autorun(() => handler(obs.aa, obs.bb, obs.cc, obs.dd));
        expect(handler).toHaveBeenCalledTimes(1);

        const outScope = batch.scope?.bound!((num: number) => {
            obs.aa = num;
        });

        batch(() => {
            // 分批操作 +1
            outScope && outScope(123);
            const innerScope = batch.scope?.bound!((value: string) => {
                obs.cc = value;
            });

            // 分批操作 +1
            innerScope && innerScope("ccccc");

            // 批量操作 +1，总计 4 次
            obs.bb = 321;
            obs.dd = "ddddd";

            // 再添加 3 次外部分批操作，3 次内部分批操作
            if (outScope) {
                outScope(111);
                outScope(222);
                outScope(333);
            }

            // 实际增加的是 6 - 1，总计 4 + 5 = 9
            // 所以建议 scope 放在 batch 顶部
            if (innerScope) {
                innerScope("qqqqq");
                innerScope("rrrrr");
                innerScope("sssss");
            }
        });

        expect(handler).toHaveBeenCalledTimes(9);
    });

    // 在 track 函数中使用 batch.scope
    test("batch.scope track", () => {
        const obs = observable({
            aa: { bb: 123 },
            cc: 1
        });

        const handler = jest.fn();
        autorun(() => batch.scope!(() => {
            handler(obs.aa.bb);
            obs.cc += 20;
        }));

        // 注意 分批操作是可以在 batch 外部执行的
        batch.scope!(() => {});

        // 不能执行的只有autorun.memo 和 autorun.effect
        expect(() => autorun.memo(() => ({}))).toThrow();
        expect(() => autorun.effect(() => {})).toThrow();

        // 初始化执行 1 次
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);

        // 由于 batch 会收集依赖，所以修改数据会继续响应
        obs.aa.bb = 321;
        expect(handler).toHaveBeenCalledTimes(2);
        expect(obs.cc).toBe(41);
    });

    // 在 track 函数中使用 batch.scope.bound
    test("batch.scope bound track", () => {
        const obs = observable({
            aa: { bb: 123 },
            cc: 1,
        });

        const handler = jest.fn();
        autorun(() => {
            const bound = batch.scope?.bound!((num: number) => {
                handler(obs.aa.bb);
                obs.cc += num;
            });
            bound && bound(20);
        });

        // 初始化执行一次
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);

        // batch 会收集依赖，再次修改会继续响应
        obs.aa.bb = 321;
        expect(handler).toHaveBeenCalledTimes(2);
        expect(obs.cc).toBe(41);

        // 修改 cc 会先赋值，然后再发生响应
        // 由于 obs 是通过 observable 深度劫持，所以修改 cc 也会响应
        obs.cc = 10;
        expect(handler).toHaveBeenCalledTimes(3);
        expect(obs.cc).toBe(30);
    });

    // 批量操作抛出错误
    test("batch error", () => {
        const handler = jest.fn();
        try {
            batch(() => {
                throw "123";
            });
        } catch(e) {
            handler(e);
        }

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith("123");
    });
});

// define 定义模型中使用 batch 批量操作
describe("annotation batch", () => {
    // define 中使用 batch
    test("batch", () => {
        const obs = define({
            aa: { bb: 123 },
            setData(data: number[]) {
                this.aa.bb = data[0] ?? 0;
                this.aa.bb = data[1] ?? 0;
            }
        }, {
            aa: observable,
            setData: batch,
        });

        const handler = jest.fn();
        autorun(() => handler(obs.aa.bb));

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(123);

        obs.aa.bb = 111;
        obs.aa.bb = 222;
        expect(handler).toHaveBeenCalledTimes(3);
        expect(handler).toHaveBeenNthCalledWith(2, 111);
        expect(handler).toHaveBeenNthCalledWith(3, 222);

        // 原本只能通过 batch.bound 实现的功能，通过 define 可以让 batch 实现
        obs.setData([333, 444]);
        expect(handler).toHaveBeenCalledTimes(4);
        expect(handler).toHaveBeenNthCalledWith(4, 444);
    });

    // 在 track 函数中使用模型 batch
    test("batch track", () => {
        const handler = jest.fn();
        const obs = define({
            aa: { bb: 123 },
            cc: 1,
            setData(num: number) {
                handler(obs.aa.bb);
                obs.cc += num;
            }
        }, {
            aa: observable,
            setData: batch
        });

        autorun(() => obs.setData(20));
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);

        // 即便在 track 中使用，batch.bound 仍旧会收集依赖
        obs.aa.bb = 321;
        expect(handler).toHaveBeenCalledTimes(2);
        expect(obs.cc).toBe(41);
    });

    // define 中使用 batch.bound
    test("batch.bound", () => {
        const obs = define({
            aa: { bb: 123 },
            setData(data: number[]) {
                this.aa.bb = data[0] ?? 0;
                this.aa.bb = data[1] ?? 0;
            }
        }, {
            aa: observable,
            setData: batch.bound
        });

        const handler = jest.fn();
        autorun(() => handler(obs.aa.bb));

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(123);

        obs.aa.bb = 111;
        obs.aa.bb = 222;
        expect(handler).toHaveBeenCalledTimes(3);
        expect(handler).toHaveBeenNthCalledWith(2, 111);
        expect(handler).toHaveBeenNthCalledWith(3, 222);

        obs.setData([333, 444]);
        expect(handler).toHaveBeenCalledTimes(4);
        expect(handler).toHaveBeenNthCalledWith(4, 444);
    });

    // track 函数中使用模型 batch.bound
    test("batch.bound track", () => {
        const handler = jest.fn();
        const obs = define({
            aa: { bb: 123 },
            cc: 1,
            setData(num: number) {
                handler(obs.aa.bb);
                obs.cc += num;
            }
        }, {
            aa: observable,
            setData: batch.bound
        });

        autorun(() => obs.setData(20));
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);

        obs.aa.bb = 321;
        expect(handler).toHaveBeenCalledTimes(2);
        expect(obs.cc).toBe(41);
    });

    // 定义模型中使用 batch.scope
    test("batch.scope", () => {
        const obs = define<DefineDataType>({
            aa: null, bb: null, cc: null, dd: null,
            scope1(val) {
                this.aa = val;
            },
            scope2(val) {
                this.cc = val;
            }
        }, {
            aa: observable,
            bb: observable,
            cc: observable,
            dd: observable,
            scope1: batch.scope,
            scope2: batch.scope,
        });

        const handler = jest.fn();
        autorun(() => handler(obs.aa, obs.bb, obs.cc, obs.dd));
        expect(handler).toHaveBeenCalledTimes(1);
        
        batch(() => {
            obs.scope1 && obs.scope1(123);
            obs.scope2 && obs.scope2("ccccc");
            obs.bb = 321;
            obs.dd = "ddddd";
        });

        expect(handler).toHaveBeenCalledTimes(4);
        expect(handler).toHaveBeenNthCalledWith(1, null, null, null, null);
        expect(handler).toHaveBeenNthCalledWith(2, 123, null, null, null);
        expect(handler).toHaveBeenNthCalledWith(3, 123, null, "ccccc", null);
        expect(handler).toHaveBeenNthCalledWith(4, 123, 321, "ccccc", "ddddd");
    });

    // 定义模型中使用 batch.scope.bound
    test("batch.scope bound", () => {
        const obs = define<DefineDataType>({
            aa: null, bb: null, cc: null, dd: null,
            scope1(val) {
                this.aa = val;
            },
            scope2(val) {
                this.cc = "ccccc";
            }
        }, {
            aa: observable,
            bb: observable,
            cc: observable,
            dd: observable,
            scope1: batch.scope?.bound,
            scope2: batch.scope?.bound,
        });
        
        const handler = jest.fn();
        autorun(() => handler(obs.aa, obs.bb, obs.cc, obs.dd));
        expect(handler).toHaveBeenCalledTimes(1);

        batch(() => {
            obs.scope1 && obs.scope1(123);
            obs.scope2 && obs.scope2("ccccc");
            obs.bb = 321;
            obs.dd = "ddddd";
        });

        expect(handler).toHaveBeenCalledTimes(4);
        expect(handler).toHaveBeenNthCalledWith(1, null, null, null, null);
        expect(handler).toHaveBeenNthCalledWith(2, 123, null, null, null);
        expect(handler).toHaveBeenNthCalledWith(3, 123, null, "ccccc", null);
        expect(handler).toHaveBeenNthCalledWith(4, 123, 321, "ccccc", "ddddd");
    });

    // 在 track 函数中使用模型 batch.scope
    test("batch.scope track", () => {
        const handler = jest.fn();
        const obs = define({
            aa: { bb: 123 },
            cc: 1,
            scope(num: number) {
                handler(this.aa.bb);
                this.cc += num;
            }
        }, {
            aa: observable,
            scope: batch.scope
        });

        autorun(() => obs.scope!(20));
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);

        obs.aa.bb = 321;
        expect(handler).toHaveBeenCalledTimes(2);
        expect(obs.cc).toBe(41);

        // 并没有劫持 cc，所以 scope 不响应 cc 的更新
        // 定义模型中只要没有 observable 绑定，就不会作为依赖跟踪
        obs.cc = 10;
        expect(handler).toHaveBeenCalledTimes(2);
        expect(obs.cc).toBe(10);
    });

    // 在 track 函数中使用 batch.scope.bound
    test("batch.scope bound track", () => {
        const handler = jest.fn();
        const obs = define({
            aa: { bb: 123 },
            cc: 1,
            scope(num: number) {
                handler(this.aa.bb);
                this.cc += num;
            }
        }, {
            aa: observable,
            scope: batch.scope?.bound
        });

        autorun(() => obs.scope(20));
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);

        obs.aa.bb = 321;
        expect(handler).toHaveBeenCalledTimes(2);
        expect(obs.cc).toBe(41);

        // cc 并没有被 observable 劫持
        obs.cc = 10;
        expect(handler).toHaveBeenCalledTimes(2);
        expect(obs.cc).toBe(10);
    });
});

// 批量操作结束回调， batch 独有 action 没有
describe("batch endpoint", () => {
    // batch.endpoint 注册批量执行结束回调
    test("normal endpoint", () => {
        const tokens: string[] = [];
        const inner = batch.bound!(() => {
            batch.endpoint!(() => tokens.push("endpoint"));
            tokens.push("inner");
        });
        const wrapper = batch.bound!(() => {
            inner();
            tokens.push("wrapper");
        });
        wrapper();
        expect(tokens).toEqual(["inner", "wrapper", "endpoint"]);
    });

    // batch.endpoint 意外的结束
    test("unexpect endpoint", () => {
        const token: string[] = [];
        const inner = batch.bound!(() => {
            batch.endpoint!();
            token.push("inner");
        });
        const wrapper = batch.bound!(() => {
            inner();
            token.push("wrapper");
        });
        wrapper();
        expect(token).toEqual(["inner", "wrapper"]);
    });

    // 直接使用 batch.endpoint
    test("no wrapper endpoint", () => {
        const tokens: string[] = [];
        batch.endpoint!(() => tokens.push("endpoint"));
        expect(tokens).toEqual(["endpoint"]);
    });
});

// 在 reaction 收集依赖
test("reaction collect in batch valid", () => {
    const handler = jest.fn();
    const obs = observable({ aa: 11, bb: 22, cc: 33 });
    reaction(
        () => obs.aa,
        (newValue, oldValue) => {
            // 这里并没有任何意义，永远得到 undefined
            void obs.cc;

            // 为了让 subscrible 有意义，加一个 handler
            handler(newValue, oldValue);
        }
    );

    expect(handler).toHaveBeenCalledTimes(0);
    const fn = jest.fn();

    autorun(() => {
        batch.scope!(() => {
            obs.aa = obs.bb;
        });
        fn();
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(22, 11);

    obs.bb = 44;
    expect(fn).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledTimes(2);
    expect(obs.aa).toBe(44);
    expect(handler).toHaveBeenCalledWith(44, 22);
});

// 在 reaction subscript 中收集依赖
test("reaction collect in batch invalid", () => {
    const obs = observable({ aa: 11, bb: 22, cc: 33 });
    reaction(
        () => obs.aa,
        () => {
            void obs.cc;
        }
    );

    const fn = jest.fn();
    autorun(() => {
        batch.scope!(() => {
            obs.aa = obs.bb;
        });
        fn();
    });

    expect(fn).toHaveBeenCalledTimes(1);

    obs.bb = 44;
    expect(fn).toHaveBeenCalledTimes(2);

    obs.cc = 55;
    expect(fn).toHaveBeenCalledTimes(3);
});

type DefineDataType = {
    aa: null | number;
    bb: null | number;
    cc: null | string;
    dd: null | string;
    scope1: { (val: number): void };
    scope2: { (val: string): void };
}