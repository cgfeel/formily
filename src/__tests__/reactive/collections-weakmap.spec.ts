import { autorun, observable, raw } from "@formily/reactive";

// 劫持 WeakMap 类型对象作为 observable 对象
describe("WeakMap", () => {
    // 创建一个 WeakMap 类型的 observable 对象
    test("should be a proper JS WeakMap", () => {
        const weakMap = observable(new WeakMap());
        expect(weakMap).toBeInstanceOf(WeakMap);
        expect(raw(weakMap)).toBeInstanceOf(WeakMap);
    });

    // 在 autorun 中响应 WeakMap 类型对象
    test("should autorun mutations", () => {
        const handler = jest.fn();
        const key = {};

        const weakMap = observable(new WeakMap());
        autorun(() => handler(weakMap.get(key)));

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(undefined);

        weakMap.set(key, "value");
        expect(handler).toHaveBeenCalledTimes(2);
        expect(handler).toHaveBeenCalledWith("value");

        weakMap.set(key, "value2");
        expect(handler).toHaveBeenCalledTimes(3);
        expect(handler).toHaveBeenCalledWith("value2");

        weakMap.delete(key);
        expect(handler).toHaveBeenCalledTimes(4);
        expect(handler).toHaveBeenCalledWith(undefined);
    });

    // 在 autorun 中不响应 WeakMap 不合理的自定义属性更新
    test("should not autorun custom property mutations", () => {
        const handler = jest.fn();
        const weakMap = observable(new WeakMap());

        // @ts-ignore
        autorun(() => handler(weakMap["customProp"]));
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(undefined);

        // @ts-ignore
        weakMap["customProp"] = "Hello World";
        expect(handler).toHaveBeenCalledTimes(1);
    });

    // 在 autorun 中不响应 WeakMap 中没有更新的属性
    test("should not autorun non value changing mutations", () => {
        const handler = jest.fn();
        const key = {};

        const weakMap = observable(new WeakMap());
        autorun(() => handler(weakMap.get(key)));

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(undefined);

        weakMap.set(key, "value");
        expect(handler).toHaveBeenCalledTimes(2);
        expect(handler).toHaveBeenLastCalledWith("value");

        weakMap.set(key, "value");
        expect(handler).toHaveBeenCalledTimes(2);

        weakMap.delete(key);
        expect(handler).toHaveBeenCalledTimes(3);
        expect(handler).toHaveBeenLastCalledWith(undefined);

        weakMap.delete(key);
        expect(handler).toHaveBeenCalledTimes(3);
    });

    // 在 autorun 中不响应 WeakMap 原生对象
    test("should not autorun raw data", () => {
        const handler = jest.fn();
        const key = {};

        const weakMap = observable(new WeakMap());
        autorun(() => handler(raw(weakMap).get(key)));

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(undefined);

        weakMap.set(key, "hello");
        weakMap.delete(key);
        expect(handler).toHaveBeenCalledTimes(1);
    });

    // 在 autorun 中不响应来自 WeakMap 原生对象增删操作
    test("should not be triggered by raw mutaions", () => {
        const handler = jest.fn();
        const key = {};

        const weakMap = observable(new WeakMap());
        const dataRaw = raw(weakMap);

        autorun(() => handler(weakMap.get(key)));
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(undefined);

        dataRaw.set(key, "hellow");
        dataRaw.delete(key);
        expect(handler).toHaveBeenCalledTimes(1);
    });
});