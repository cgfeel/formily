import { action, autorun, batch, define, observable, reaction } from "@formily/reactive";

// action 批量操作普通用法
describe("normal action", () => {
    // 不使用 action 每次修改 observable 都会响应一次
    test("no action", () => {
        const obs = observable({ aa: { bb: 123 } });
        const handler = jest.fn();

        expect(handler).toHaveBeenCalledTimes(0);

        // 接收一个 tracker 函数，如果函数内部有消费 observable 数据，数据发生变化时，tracker 函数会重复执行
        // 初始化会调用 1 次
        autorun(() => {
            handler(obs.aa.bb);
        });
        expect(handler).toHaveBeenCalledTimes(1);

        // 之后没修改一次值，更新一次
        obs.aa.bb = 111;
        obs.aa.bb = 222;
        expect(handler).toHaveBeenCalledTimes(3);

        obs.aa.bb = 333;
        obs.aa.bb = 444;
        expect(handler).toHaveBeenCalledTimes(5);
    });

    // action 内部所有修改只记录一次响应
    test("action", () => {
        const obs = observable({ aa: { bb: 123 } });

        const handler = jest.fn();
        expect(handler).toHaveBeenCalledTimes(0);

        autorun(() => {
            handler(obs.aa.bb);
        });
        expect(handler).toHaveBeenCalledTimes(1);

        obs.aa.bb = 111;
        obs.aa.bb = 222;
        expect(handler).toHaveBeenCalledTimes(3);

        // 定义一个批量动作，回调函数中所有的操作只计算 1 次
        action(() => {
            obs.aa.bb = 333;
            obs.aa.bb = 444;
        });
        expect(handler).toHaveBeenCalledTimes(4);
        expect(obs.aa.bb).toBe(444);
    });

    // 在 track 函数中使用 action
    test("action track", () => {
        const handler = jest.fn();
        const obs = observable({
            aa: { bb: 123 },
            cc: 1,
        });

        autorun(() => {
            // 批量动作不会被跟踪
            action(() => {
                handler(obs.aa.bb);
                obs.cc = obs.cc + 20;
            });
        });

        // 初始化调用 1 次
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);

        // 更新值后没有变化
        obs.aa.bb = 321;
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);
    });

    // action.bound 绑定一个批量操作
    // 除了回调函数之外，还接受一个上下文作为第二个参数
    test("action.bound", () => {
        const obs = observable({ aa: { bb: 123 } });
        const handler = jest.fn();

        // action.bound 不会立即执行，会返回一个函数以便需要时执行
        const setData = action.bound!((data: number[]) => {
            obs.aa.bb = data[0]??0;
            obs.aa.bb = data[1]??0;
        });

        expect(handler).toHaveBeenCalledTimes(0);
        autorun(() => {
            handler(obs.aa.bb);
        });

        // 设置 autorun 之后会执行一次
        expect(handler).toHaveBeenCalledTimes(1);

        // 增加 2 次值修改
        obs.aa.bb = 111;
        obs.aa.bb = 222;
        expect(handler).toHaveBeenCalledTimes(3);

        // 批量执行只计算一次
        setData([333, 444]);
        expect(handler).toHaveBeenCalledTimes(4);

        // 回调函数是空的，不会有任何执行，之后再次设置会继续响应
        action.bound!(() => {});
        obs.aa.bb = 555;

        expect(handler).toHaveBeenCalledTimes(5);
    });

    // 在 track 函数中使用 action.bound
    test("action.bound track", () => {
        const handler = jest.fn();
        const obs = observable({
            aa: { bb: 123 },
            cc: 1
        });
        autorun(() => {
            const bound = action.bound!((num: number) => {
                handler(obs.aa.bb);
                obs.cc += num;
            });
            // action.bound 返回的是一个函数，一定要执行一次
            bound(20);
        });

        // autorun 里的 action.bound 会执行一次
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);

        // 之后不再响应
        obs.aa.bb = 321;
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);
    });

    // action.scope 在 action 中分批执行
    test("action.scope xxx", () => {
        const obs = observable<Partial<Record<string, number|string>>>({});
        const handler = jest.fn();

        autorun(() => {
            /**
             * - undefined undefined undefined undefined
             * - 123 undefined undefined undefined
             * - 123 undefined cccc undefined
             * - 123 321 cccc dddd
             */
            handler(obs.aa, obs.bb, obs.cc, obs.dd);
        });

        // 初始化执行一次
        expect(handler).toHaveBeenCalledTimes(1);
        action(() => {
            // scope 执行 1 次
            action.scope!(() => {
                obs.aa = 123;
            });
            // scope 执行 1 次
            action.scope!(() => {
                obs.cc = "cccc";
            });
            // 批量操作执行 1 次
            obs.bb = 321;
            obs.dd = "dddd";
        });
        expect(handler).toHaveBeenCalledTimes(4);

        // 为了和下面 scope.bound 做区别，这里再执行一遍增加 3 次
        action(() => {
            action.scope!(() => {
                obs.aa = 456;
            });
            action.scope!(() => {
                obs.cc = "xxxx";
            });
            // 批量操作执行 1 次
            obs.bb = 654;
            obs.dd = "yyyy";
        });
        expect(handler).toHaveBeenCalledTimes(7);
    });

    // 使用 action.socpe.bound
    test("action.scope bound", () => {
        const obs = observable<Partial<Record<string, number|string>>>({});
        const handler = jest.fn();
        
        autorun(() => {
            handler(obs.aa, obs.bb, obs.cc, obs.dd);
        });
        expect(handler).toHaveBeenCalledTimes(1);

        const outScope = action.scope?.bound!((num: number) => {
            obs.aa = num;
        });
        action(() => {
            outScope && outScope(123);
            const innerScope = action.scope?.bound!((val: string) => {
                obs.cc = val;
            });

            innerScope && innerScope("cccc");
            obs.bb = 321;
            obs.dd = "dddd";

            // 上面的执行数量 1 + 3 = 4
            // 再增加 3 次 scope.bound，原本：4 + 3，但实际要减去 1 次：4 + 3 - 1 = 6
            if (outScope) {
                outScope(555);
                outScope(666);
                outScope(777);
            }

            // 之后再增加 4 次 scope.bound，将全部计入：6 + 4 = 10
            if (innerScope) {
                innerScope("test001");
                innerScope("test002");
                innerScope("test003");
                innerScope("test004");
            }
        });
        expect(handler).toHaveBeenCalledTimes(10);

        // 重复执行一遍会
        action(() => {
            outScope && outScope(456);
            const innerScope = action.scope?.bound!((val: string) => {
                obs.cc = val;
            });

            innerScope && innerScope("xxxx");
            obs.bb = 654;
            obs.dd = "yyyy";

            // 以上增加 3 次，10 + 3 = 13
            // 再增加 4 次 scope.bound，原本：13 + 4，但实际要减去 1 次：13 + 4 - 1 = 16
            if (innerScope) {
                innerScope("test010");
                innerScope("test011");
                innerScope("test012");
                innerScope("test013");
            }

            // 再增加 3 次 scope.bound：16 + 3 = 19
            if (outScope) {
                outScope(555);
                outScope(666);
                outScope(777);
            }
        });
        expect(handler).toHaveBeenCalledTimes(19);
    });

    // 在 track 函数中使用 action.scope，只执行 1 次，和 autorun 使用 action 一样
    test("action.scope track", () => {
        const handler = jest.fn();
        const obs = observable({
            aa: { bb: 123 },
            cc: 1
        });

        autorun(() => {
            action.scope!(() => {
                handler(obs.aa.bb);
                obs.cc += 20;
            });
        });

        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toEqual(21);

        // 执行之后不再响应
        obs.aa.bb = 321;
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toEqual(21);
    });

    // 在 track 函数中使用 action.scope.bound，只执行 1 次，和 autorun 使用 action.bound 一样
    test("action.scope bound track", () => {
        const handler = jest.fn();
        const obs = observable({
            aa: { bb: 123 },
            cc: 1
        });

        autorun(() => {
            const bound = action.scope?.bound!((num: number) => {
                handler(obs.aa.bb);
                obs.cc += num;
            });
            bound && bound(20);
        });

        // 初始化执行一次之后再也不执行
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);

        obs.aa.bb = 321;
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);
    });
});

// define 定义模型中使用 action 批量操作
describe("annotation action", () => {
    // define 中使用 action
    test("action", () => {
        // 手动定义模型
        const obs = define({
            aa: { bb: 123 },
            cc: { dd: 321 },
            setData() {
                this.aa.bb = 333;
                this.aa.bb = 444;
            }
        }, {
            aa: observable,
            setData: action,
        });

        const handler = jest.fn();
        autorun(() => {
            // autorun 会自动收集依赖
            handler(obs.aa.bb);
        });

        // 这里初始化调用一次，并没有触发 action 对应的 setData 
        expect(handler).toHaveBeenCalledTimes(1);

        obs.aa.bb = 111;
        obs.aa.bb = 222;
        expect(handler).toHaveBeenCalledTimes(3);

        // 这样操作相当于 action.bound，批量操作，不同的是不能像 action.bound 传递上下文
        obs.setData();
        expect(handler).toHaveBeenCalledTimes(4);

        // 再做一个测试，收集一个并非 observable 的普通 对象
        const handler1 = jest.fn();
        autorun(() => {
            // autorun 会自动收集依赖
            handler1(obs.cc.dd);
        });
        expect(handler1).toHaveBeenCalledTimes(1);

        // 再次修改数据不会响应
        obs.cc.dd = 555;
        expect(handler1).toHaveBeenCalledTimes(1);
    });

    // 在 track 函数中使用模型 action
    test("action track", () => {
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
            setData: action
        });

        // autorun 不会收集批量操作的依赖
        autorun(() => {
            obs.setData(20);
        });

        // 初始化调用一次之后不再响应
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);

        obs.aa.bb = 321;
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);
    });

    // define 中使用 action.bound
    test("action.bound", () => {
        const handler = jest.fn();
        const obs = define({
            aa: { bb: 123 },
            setData(data: number[]) {
                this.aa.bb = data[0] ?? 0;
                this.aa.bb = data[0] ?? 0;
            }
        }, {
            aa: observable,
            setData: action.bound
        });

        autorun(() => {
            handler(obs.aa.bb);
        });
        expect(handler).toHaveBeenCalledTimes(1);

        obs.aa.bb = 111;
        obs.aa.bb = 222;
        expect(handler).toHaveBeenCalledTimes(3);

        // action.bound 和 action 一样，不同的是可以传递上下文
        obs.setData([333, 444]);
        expect(handler).toHaveBeenCalledTimes(4);
    });

    // track 函数中使用模型 action.bound
    test("action.bound track", () => {
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
            setData: action.bound
        });

        // 在 autorun 中使用 批量操作，不会收集 action 中的依赖
        autorun(() => {
            obs.setData(20);
        });

        // 只在初始响应，之后不再响应
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toEqual(21);
        
        obs.aa.bb = 321;
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toEqual(21);
    });

    // define 中使用 action.scope
    test("action.scope", () => {
        const handler = jest.fn();
        const obs = define<DefineItemsType>({
            aa: null, bb: null, cc: null, dd: null,
            scope1(num) {
                this.aa = num;
            },
            scope2(val) {
                this.cc = val;
            }
        }, {
            aa: observable,
            bb: observable,
            cc: observable,
            dd: observable,
            scope1: action.scope,
            scope2: action.scope,
        });

        // 初始化执行一次
        autorun(() => {
            handler(obs.aa, obs.bb, obs.cc, obs.dd);
        });
        expect(handler).toHaveBeenCalledTimes(1);

        action(() => {
            // 作用域 + 1
            obs.scope1(123);
            // 作用域 + 1
            obs.scope2("ccccc");
            // 批量操作 + 1
            obs.bb = 321;
            obs.dd = "ddddd";

            // 和上面 bound 一样，批量操作下面执行 scope，第一个会随批量操作一起执行
            obs.scope1(456);

            // 然后从这里开始执行 2 条
            obs.scope2("qqqqq");
            obs.scope1(999);
        });
        expect(handler).toHaveBeenCalledTimes(6);
    });

    // define 中使用 action.scope.bound
    test("action.scope bound", () => {
        const handler = jest.fn();
        const obs = define<DefineItemsType>({
            aa: null, bb: null, cc: null, dd: null,
            scope1(num) {
                this.aa = num;
            },
            scope2(val) {
                this.cc = val;
            }
        }, {
            aa: observable,
            bb: observable,
            cc: observable,
            dd: observable,
            scope1: action.scope?.bound,
            scope2: action.scope?.bound,
        });

        autorun(() => {
            handler(obs.aa, obs.bb, obs.cc, obs.dd);
        });
        expect(handler).toHaveBeenCalledTimes(1);

        action(() => {
            obs.scope1(123);
            obs.scope2("ccccc");
            obs.bb = 321;
            obs.dd = "ddddd";
        });
        expect(handler).toHaveBeenCalledTimes(4);
    });

    // track 函数中使用模型 action.scope
    test("action.scope track", () => {
        const handler = jest.fn();
        const obs = define({
            aa: { bb: 123 },
            cc: 1,
            scope() {
                handler(this.aa.bb);
                this.cc += 20;
            }
        }, {
            aa: observable,
            cc: observable,
            scope: action.scope
        });

        // autorun 不收集 action 包含的依赖
        autorun(() => {
            obs.scope();
        });
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);

        // 修改什么数据都不会响应调用 handler
        obs.aa.bb = 321;
        obs.cc = 99;
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(99);
    });

    // track 函数中使用模型 action.scope.bound
    test("action.scope bound track", () => {
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
            cc: observable,
            scope: action.scope?.bound,
        });

        autorun(() => {
            obs.scope(20);
        });

        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);

        obs.aa.bb = 321;
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);
    });

    // 嵌套 action 批量操作在 reaction 中 subscrible
    test("nested action to reaction", () => {
        const obs = observable({ aa: 0 });
        const handler = jest.fn();

        reaction(
            // 根据 aa 值变化响应
            () => obs.aa,
            (newValue) => handler(newValue),
        );

        // 初始化后不会立即响应，即便将值修改为一样的也不会响应
        // 这里初始化不响应，是因为调用 handler 是在 reaction 的第二个参数 subscribe
        obs.aa = 0;
        expect(handler).toHaveBeenCalledTimes(0);

        // 在嵌套的 action 中，多层嵌套也是批量操作，如果要分批操作需要通过 action.sound
        action(() => {
            obs.aa = 1;
            action(() => {
                obs.aa = 1.5;
                action(() => {
                    obs.aa = 2;
                });
            });
        });

        action(() => {
            obs.aa = 3;
            action(() => {
                obs.aa = 3.5;
                action(() => {
                    obs.aa = 4;
                });
            });
        });

        // 第一次传入的参数是 2，第二次传入的值是 4，共执行 2 次
        expect(handler).toHaveBeenNthCalledWith(1, 2);
        expect(handler).toHaveBeenNthCalledWith(2, 4);
        expect(handler).toHaveBeenCalledTimes(2);
    });

    // 嵌套 action 和 batch 批量操作在 reaction 中 subscrible
    test("nested action/batch to reaction", () => {
        const handler = jest.fn();
        const obs = define({
            bb: 0,
            get aa() {
                return this.bb;
            },
            set aa(v: number) {
                this.bb = v;
            }
        }, {
            aa: observable.computed,
            bb: observable,
        });

        reaction(
            () => obs.aa,
            (newValue) => handler(newValue)
        );

        // 改变的值没有变化
        // 这里初始化不响应，是因为调用 handler 是在 reaction 的第二个参数 subscribe
        obs.aa = 0;
        expect(handler).toHaveBeenCalledTimes(0);

        action(() => {
            obs.aa = 1;
            batch(() => {
                obs.aa = 2;
            });
        });

        action(() => {
            obs.aa = 3;
            batch(() => {
                obs.aa = 4;
            });
        });

        expect(handler).toHaveBeenNthCalledWith(1, 2);
        expect(handler).toHaveBeenNthCalledWith(2, 4);
        expect(handler).toHaveBeenCalledTimes(2);
    });
});

type DefineItemsType = Record<"aa"|"bb"|"cc"|"dd", null|number|string> & {
    scope1: (num: number) => void;
    scope2: { (val: string): void };
}