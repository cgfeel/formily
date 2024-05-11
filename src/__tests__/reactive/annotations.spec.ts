import { isObservable, observe, observable, reaction } from "@formily/reactive";

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