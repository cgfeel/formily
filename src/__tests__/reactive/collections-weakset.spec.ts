import { autorun, observable, raw } from "@formily/reactive";

// 劫持 WeakSet 类型对象作为 observable 对象
describe("WeakSet", () => {
     // 创建一个 WeakSet 类型的 observable 对象
    test("should be a proper JS WeakSet", () => {
        const weakSet = observable(new WeakSet());
        expect(weakSet).toBeInstanceOf(WeakSet);
        expect(raw(weakSet)).toBeInstanceOf(WeakSet);
    });

    // 在 autorun 中响应 WeakSet 对象
    test("should autorun mutations", () => {
        const handler = jest.fn();
        const value = {};

        const weakSet = observable(new WeakSet());
        autorun(() => handler(weakSet.has(value)));

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenLastCalledWith(false);

        weakSet.add(value);
        expect(handler).toHaveBeenCalledTimes(2);
        expect(handler).toHaveBeenLastCalledWith(true);

        weakSet.delete(value);
        expect(handler).toHaveBeenCalledTimes(3);
        expect(handler).toHaveBeenLastCalledWith(false);
    });

    // 在 autorun 中不响应 WeakSet 对象不合理的自定义属性更新
    test("should not autorun custom property mutations", () => {
        const handler = jest.fn();
        const weakSet = observable(new WeakSet());

        // @ts-ignore
        autorun(() => handler(weakSet["customProp"]));
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenLastCalledWith(undefined);

        // @ts-ignore
        weakSet["customProp"] = "Hello World";
        expect(handler).toHaveBeenCalledTimes(1);
    });

    // 在 autorun 中不响应 WeakSet 对象没有更新的属性
    test("should not autorun non value changing mutations", () => {
        const handler = jest.fn();
        const value = {};

        const weakSet = observable(new WeakSet());
        autorun(() => handler(weakSet.has(value)));

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenLastCalledWith(false);

        weakSet.add(value);
        expect(handler).toHaveBeenCalledTimes(2);
        expect(handler).toHaveBeenLastCalledWith(true);

        weakSet.add(value);
        expect(handler).toHaveBeenCalledTimes(2);

        weakSet.delete(value);
        expect(handler).toHaveBeenCalledTimes(3);
        expect(handler).toHaveBeenLastCalledWith(false);

        weakSet.delete(value);
        expect(handler).toHaveBeenCalledTimes(3);
    });

    // 在 autorun 中不响应 WeakSet 原生对象
    test("should not autorun raw data", () => {
        const handler = jest.fn();
        const value = {};

        const weakSet = observable(new WeakSet());
        autorun(() => handler(raw(weakSet).has(value)));

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenLastCalledWith(false);

        weakSet.add(value);
        weakSet.delete(value);
        expect(handler).toHaveBeenCalledTimes(1);
    });

    // 在 autorun 中不响应来自 WeakSet 原生对象触发的增删操作
    test("should not be triggered by raw mutations", () => {
        const handler = jest.fn();
        const value = {};

        const weakSet = observable(new WeakSet());
        const dataRaw = raw(weakSet);

        autorun(() => handler(weakSet.has(value)));
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenLastCalledWith(false);

        dataRaw.add(value);
        dataRaw.delete(value);
        expect(handler).toHaveBeenCalledTimes(1);
    });
});