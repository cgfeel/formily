import { action, autorun, define, isObservable, model, observe, observable, reaction, untracked } from "@formily/reactive";

// 创建劫持对象 - 默认深度劫持
test("observable annotation", () => {
    const obs = observable<any>({ aa: 111 })
    const handler = jest.fn();
    const handler1 = jest.fn();

    // 监听 observable 对象的所有操作，支持深度监听也支持浅监听，初始化不会触发
    observe(obs, handler1);

    // 监控数据变化，只支持浅监听，初始化就触发 1 次
    // 浅监控还包括 autorun，对于深度劫持对象，浅监控只监控具体数据变换
    // 例如：obs.aa 就只浅监控 obs.aa，obs.aa.bb 就只监控 obs.aa.bb
    reaction(() => handler(obs.aa));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler1).toHaveBeenCalledTimes(0);

    obs.aa = { bb: { cc: 123 } }
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler1).toHaveBeenCalledTimes(1);

    obs.aa.bb = 333
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler1).toHaveBeenCalledTimes(2);

    // 官方文档有个内部方法 getObservableMaker 测试，这里无法调用跳过
});

// 创建的是浅劫持响应式对象
test("shallow annotation", () => {
    const obs = observable.shallow<any>({ aa: 111 });
    const handler = jest.fn();
    const handler1 = jest.fn();

    // 深监听对象、浅监听对象 - 由于创建的是浅劫持响应式对象会有些许不同
    observe(obs, handler1);
    expect(handler1).toHaveBeenCalledTimes(0);
    
    // 浅监听
    reaction(() => handler(obs.aa));
    expect(handler).toHaveBeenCalledTimes(1);

    // 修改对象后判断某个对象是否是 observable 对象
    obs.aa = { bb: { cc: 123 } };
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledTimes(2);
    expect(isObservable(obs)).toBeTruthy();

    // 由于创建的是浅劫持响应式对象，对象属性不是 observable 对象
    expect(isObservable(obs.aa)).toBeFalsy();
    expect(isObservable(obs.aa.bb)).toBeFalsy();
    
    // 深度修改对象，本来深监控会响应，但由于创建的是浅劫持响应对象所以不会响应
    obs.aa.bb = 333;
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledTimes(2);

    // 创建一个不存在的属性，只有深度监听才会响应
    obs.cc = 444;
    expect(handler1).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledTimes(2);
});

// 创建引用劫持响应式对象，带有 get/set 方法
test("box annotation", () => {
    const obs = observable.box(123);
    const handler = jest.fn();
    const handler1 = jest.fn();

    observe(obs, handler1);
    reaction(() => handler(obs.get()));

    const boxValue = 333;
    obs.set(boxValue);

    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler1.mock.calls[0][0]).toMatchObject({ value: boxValue });
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenNthCalledWith(1, 123);
    expect(handler).toHaveBeenNthCalledWith(2, boxValue);
});

// 创建引用劫持响应式对象
test("ref annotation", () => {
    const obs = observable.ref(123);
    const handler = jest.fn();
    const handler1 = jest.fn();

    observe(obs, handler1);
    reaction(() => handler(obs.value));

    obs.value = 333;
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler1.mock.calls[0][0]).toMatchObject({ value: 333 });
    expect(handler).toHaveBeenNthCalledWith(1, 123);
    expect(handler).toHaveBeenNthCalledWith(2, 333);
});

// 批量操作中更新劫持对象
test("action annotation", () => {
    const obs = observable<Partial<Record<string, number>>>({});
    const setData = action.bound!(() => {
        obs.aa = 123;
        obs.bb = 321;
    });

    // 这里 handler 作为 reaction 的 subscribe，初始化不会立即执行
    const handler = jest.fn();
    reaction(
        () => [obs.aa, obs.bb],
        handler,
    )

    setData();
    expect(handler).toHaveBeenCalledTimes(1);

    // 触发响应传递的参数，第一个是新参数[aa, bb]，第二个是老参数，由于没有设定所有都是 undefined
    expect(handler).toHaveBeenCalledWith([123, 321], [undefined, undefined]);
});

// 非批量操作中更新劫持对象
test("no action annotation", () => {
    const obs = observable<Partial<Record<string, number>>>({});
    const setData = () => {
        obs.aa = 123;
        obs.bb = 321;
    };

    const handler = jest.fn();
    reaction(
        () => [obs.aa, obs.bb],
        handler
    );

    setData();
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenNthCalledWith(1, [123, undefined], [undefined, undefined]);
    expect(handler).toHaveBeenNthCalledWith(2, [123, 321], [123, undefined]);
});

// 创建一个计算缓存器
test("computed annotation", () => {
    const obs = observable({ aa: 11, bb: 22 });
    const handler = jest.fn(() => obs.aa + obs.bb);
    const runner1 = jest.fn();
    const runner2 = jest.fn();
    const runner3 = jest.fn();

    const compu = observable.computed(handler);
    expect(compu.value).toBe(33);
    expect(handler).toHaveBeenCalledTimes(1);

    // 修改值后，不拿 compu.value 就不会响应
    obs.aa = 22;
    expect(handler).toHaveBeenCalledTimes(1);

    // 拿 value 后会增加响应次数
    expect(compu.value).toBe(44);
    expect(handler).toHaveBeenCalledTimes(2);

    // autorun 中添加 compu.value 会自动个收集依赖
    const dispose = autorun(() => {
        compu.value;
        runner1();
    });

    const dispose2 = autorun(() => {
        compu.value;
        runner2();
    });

    // autorun 初始化会调用 1 次
    expect(runner1).toHaveBeenCalledTimes(1);
    expect(runner2).toHaveBeenCalledTimes(1);

    // 更新值后会通过 autorun 自动收集依赖、并且通过 compu.value 响应 handler
    // autorun 有两个，由于第一次修改后，第二次响应值没变，也就只增加响应 1 次
    obs.bb = 33;
    expect(handler).toHaveBeenCalledTimes(3);

    // 而 auturun 响应回调函数中会分别执行
    expect(runner1).toHaveBeenCalledTimes(2);
    expect(runner2).toHaveBeenCalledTimes(2);

    // 获取计算值，数值没变就不会触发响应
    expect(compu.value).toEqual(55);
    expect(handler).toHaveBeenCalledTimes(3);

    // 再次修改 aa
    obs.aa = 11;
    expect(runner1).toHaveBeenCalledTimes(3);
    expect(runner2).toHaveBeenCalledTimes(3);
    expect(handler).toHaveBeenCalledTimes(4);
    expect(compu.value).toEqual(44);

    // 停止第一个 autorun 响应，再修改值
    dispose();
    obs.aa = 22;

    expect(runner1).toHaveBeenCalledTimes(3);
    expect(runner2).toHaveBeenCalledTimes(4);
    expect(handler).toHaveBeenCalledTimes(5);
    expect(compu.value).toEqual(55);

    // 停止第二个 autorun 响应，再修改值
    dispose2();
    obs.aa = 33;

    expect(runner1).toHaveBeenCalledTimes(3);
    expect(runner2).toHaveBeenCalledTimes(4);

    // autorun 都不响应，也就没有触发 compu.value
    expect(handler).toHaveBeenCalledTimes(5);

    // 响应计算的值仍旧正常，获取后触发响应
    expect(compu.value).toEqual(66);
    expect(handler).toHaveBeenCalledTimes(6);

    // 再次添加 autorun
    autorun(() => {
        compu.value;
        runner3();
    });

    // 初始化会执行一次
    expect(runner3).toHaveBeenCalledTimes(1);

    // 数值没更新也就不会触发响应
    expect(compu.value).toEqual(66);
    expect(handler).toHaveBeenCalledTimes(6);

    // 再次修改值
    obs.aa = 11;
    expect(runner3).toHaveBeenCalledTimes(2);
    expect(compu.value).toEqual(44);
    expect(handler).toHaveBeenCalledTimes(7);
});

// 创建一个链式计算缓存器
test("computed chain annotation", () => {
    const obs = observable({ aa: 11, bb: 22 });
    const handler1 = jest.fn(() => obs.aa + obs.bb);
    const compu1 = observable.computed(handler1);

    const handler2 = jest.fn(() => (compu1.value||0) + 33);
    const compu2 = observable.computed(handler2);

    // 初始化会执行一次
    const dispose = autorun(() => compu2.value);
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);
    
    // 再次拿到值没有改变，不会重复调用
    expect(compu2.value).toBe(66);
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);

    // 修改值后两个值都会重新计算
    obs.aa = 22;
    expect(handler1).toHaveBeenCalledTimes(2);
    expect(handler2).toHaveBeenCalledTimes(2);
    expect(compu2.value).toBe(77);
    expect(handler1).toHaveBeenCalledTimes(2);
    expect(handler2).toHaveBeenCalledTimes(2);

    // 停止响应再修改值，不能自动获取 values 也就不会增加响应次数
    dispose();
    obs.aa = 11;
    expect(handler1).toHaveBeenCalledTimes(2);
    expect(handler2).toHaveBeenCalledTimes(2);

    // 手动获取 value 会触发响应
    expect(compu2.value).toBe(66);
    expect(handler1).toHaveBeenCalledTimes(3);
    expect(handler2).toHaveBeenCalledTimes(3);
});

// 快速定义领域模型
test("computed with array length", () => {
    const obs = model({
        // 普通属性自动声明 observable
        arr: ["1"],
        // getter/setter 属性自动声明 computed
        get isEmpty() {
            return this.arr.length === 0;
        },
        get isNotEmpty() {
            return this.arr.length !== 0;
        }
    });

    const handler = jest.fn();
    autorun(() => {
        handler(obs.isEmpty);
        handler(obs.isNotEmpty);
    });

    // 初始化自动调用两次
    expect(handler).toHaveBeenCalledTimes(2);

    obs.arr = [];
    expect(handler).toHaveBeenCalledTimes(4);

    obs.arr = ["4"];
    expect(handler).toHaveBeenCalledTimes(6);
});

// 快速定义领域模型 - 创建一个计算缓存器
test("computed width computed array length", () => {
    const obs = model({
        arr: [1],
        get arr2() {
            return this.arr.map((item: number) => item + 1);
        },
        get isEmpty() {
            return this.arr2.length === 0;
        },
        get isNotEmpty() {
            return this.arr2.length !== 0;
        }
    });

    const handler = jest.fn();
    const handler2 = jest.fn();

    autorun(() => {
        handler(obs.isNotEmpty);
        handler2(obs.arr2);
    });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(true);
    expect(handler2).toHaveBeenCalledTimes(1);
    expect(handler2.mock.calls[0][0]).toEqual([2]);

    // 插入一个值，不需要获取对象的 value，就会执行计算缓存器
    obs.arr.push(2);
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledWith(true);
    expect(handler2).toHaveBeenCalledTimes(2);
    expect(handler2.mock.calls[1][0]).toEqual([2, 3]);

    // 设置为空
    obs.arr = [];
    expect(handler).toHaveBeenCalledTimes(3);
    expect(handler).toHaveBeenCalledWith(false);
    expect(handler2).toHaveBeenCalledTimes(3);
    expect(handler2.mock.calls[2][0]).toEqual([]);
});

// 快速定义领域模型 - 创建一个自动收集依赖的计算缓存器
test("computed recollect dependencies", () => {
    const computed = jest.fn();
    const obs = model({
        aa: "aaa", bb: "bbb", cc: "ccc",
        get compute() {
            computed();
            return this.aa === 'aaa' ? this.bb : this.cc;
        },
    });

    const handler = jest.fn();
    autorun(() => handler(obs.compute));

    expect(obs.compute).toEqual("bbb");
    expect(handler).toHaveBeenCalledTimes(1);
    expect(computed).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenNthCalledWith(1, "bbb");

    // 修改 aa 和 bb，由于 aa 更改后不需要引用 bb，所以这里只响应 1 次
    obs.aa = "111";
    obs.bb = "222";

    expect(obs.compute).toEqual("ccc");
    expect(handler).toHaveBeenCalledTimes(2);
    expect(computed).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenNthCalledWith(2, "ccc");

    // 将 aa 再次修改回 aaa，重新计算
    obs.aa = "aaa";
    expect(obs.compute).toEqual("222");
    expect(handler).toHaveBeenCalledTimes(3);
    expect(computed).toHaveBeenCalledTimes(3);
    expect(handler).toHaveBeenNthCalledWith(3, "222");

    // 再修改 bbb，由于 aa 为 aaa，所以响应继续 +1
    obs.bb = "qqq";
    expect(obs.compute).toEqual("qqq");
    expect(handler).toHaveBeenCalledTimes(4);
    expect(computed).toHaveBeenCalledTimes(4);
    expect(handler).toHaveBeenNthCalledWith(4, "qqq");
});

// 创建一个容错的计算缓存器
test("computed no params", () => {
    // @ts-ignore 
    const compu1 = observable.computed(null);

    // @ts-ignore
    const compu2 = observable.computed();

    // 这两种方式都是错误的引入计算缓存器，得到的结果也是 undefined
    expect(compu1.value).toBeUndefined();
    expect(compu2.value).toBeUndefined();
});

// 使用一个带有 get 属性方法的对象，创建一个计算缓存器
test("computed object params", () => {
    const compu1 = observable.computed({ get: () => {} });
    const compu2 = observable.computed({ get: () => "input" });

    // 根据 get 方法返回值得到 value
    expect(compu1.value).toBeUndefined();
    expect(compu2.value).toEqual("input");
});

// untracked: 用法与 batch 相似，在给定的 untracker 函数内部永远不会被依赖收集
test("computed no track get", () => {
    const obs = observable({ aa: 123 });
    const get = jest.fn(() => obs.aa);
    const compu = observable.computed({ get });

    // 添加一个 autorun 自动计算值，初始化后自动响应 1 次
    autorun(() => compu.value);
    expect(get).toHaveBeenCalledTimes(1);

    // 以后无论获取几次都是响应 1 次
    expect(compu.value).toBe(123);
    expect(compu.value).toBe(123);
    expect(get).toHaveBeenCalledTimes(1);

    // 添加一个不跟踪的收集函数，每获取一次就重新计算一次
    untracked(() => {
        expect(compu.value).toBe(123);
        expect(compu.value).toBe(123);
    });
    expect(get).toHaveBeenCalledTimes(3);

    // action 和 untracked 一样
    action(() => {
        expect(compu.value).toBe(123);
        expect(compu.value).toBe(123);
    });
    expect(get).toHaveBeenCalledTimes(5);
});

// 手动定义一个类为领域模型
test("computed cache descriptor", () => {
    class A {
        _value = 0;
        constructor() {
            define(this, {
                _value: observable.ref,
                value: observable.computed
            });
        }
        get value() {
            return this._value;
        }
    }

    const obs1 = new A();
    const obs2 = new A();

    const handler1 = jest.fn();
    const handler2 = jest.fn();

    autorun(() => handler1(obs1.value));
    autorun(() => handler2(obs2.value));

    // autorun 初始化会执行一次
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);

    // 修改 computed 依赖的值，会重新计算
    obs1._value = 123;
    obs2._value = 123;
    expect(handler1).toHaveBeenCalledTimes(2);
    expect(handler2).toHaveBeenCalledTimes(2);
});