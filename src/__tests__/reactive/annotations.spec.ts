import { observe, observable, reaction } from "@formily/reactive";

// 监控数据响应
test("observable annotation", () => {
    const obs = observable<any>({ aa: 111 })
    const handler = jest.fn();
    const handler1 = jest.fn();

    // 监听 observable 对象的所有操作，支持深度监听也支持浅监听，初始化不会触发
    observe(obs, handler1);

    // 监控数据变化，只支持浅监听，初始化就触发 1 次
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