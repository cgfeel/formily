import { action, autorun, isObservable, observe, observable, reaction } from "@formily/reactive";

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