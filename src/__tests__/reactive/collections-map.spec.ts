import { autorun, observable, raw } from "@formily/reactive";

// 劫持 Map 类型对象作为 observable 对象
describe("Map", () => {
    // 创建一个 Map 类型的 observable 对象
    test("should be a proper JS Map", () => {
        const map = observable(new Map());
        expect(map).toBeInstanceOf(Map);
        expect(raw(map)).toBeInstanceOf(Map);
    });

    // 在 autorun 中响应 map 类型对象
    test("should autorun mutations", () => {
        const handler = jest.fn();
        const map = observable(new Map());

        // 初始化先依赖一个永远不存在的 key
        autorun(() => handler(map.get("unkey")));
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenLastCalledWith(undefined);

        // 设置 key 不会响应，因为 autorun 没有收集对应的依赖
        map.set('key', 'value');
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenLastCalledWith(undefined);

        // 重新监听依赖
        autorun(() => handler(map.get("newKey")));
        expect(handler).toHaveBeenCalledTimes(2);
        expect(handler).toHaveBeenLastCalledWith(undefined);

        map.set('newKey', 'value');
        expect(handler).toHaveBeenCalledTimes(3);
        expect(handler).toHaveBeenLastCalledWith("value");

        map.set('newKey', 'value2');
        expect(handler).toHaveBeenCalledTimes(4);
        expect(handler).toHaveBeenLastCalledWith("value2");

        map.delete("newKey");
        expect(handler).toHaveBeenCalledTimes(5);
        expect(handler).toHaveBeenLastCalledWith(undefined);
    });

    // 在 autorun 中响应 map.size
    test("should autorun size mutations", () => {
        const handler = jest.fn();
        const map = observable(new Map());

        autorun(() => handler(map.size));
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenLastCalledWith(0);

        map.set("key1", "value");
        map.set("key2", "value2");
        expect(handler).toHaveBeenCalledTimes(3);
        expect(handler).toHaveBeenNthCalledWith(2, 1);
        expect(handler).toHaveBeenNthCalledWith(3, 2);

        map.delete("key1");
        expect(handler).toHaveBeenCalledTimes(4);
        expect(handler).toHaveBeenNthCalledWith(4, 1);

        map.clear();
        expect(handler).toHaveBeenCalledTimes(5);
        expect(handler).toHaveBeenNthCalledWith(5, 0);
    });

    // 在 autorun 中通过 for of 迭代 map 获取值
    test("should autorun for of iteration", () => {
        const handler = jest.fn();
        const map = observable(new Map<string, number>());

        autorun(() => {
            let sum = 0;
            for (let [, num] of map) {
                sum += num;
            }
            handler(sum);
        });

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(0);

        map.set("key0", 3);
        expect(handler).toHaveBeenCalledTimes(2);
        expect(handler).toHaveBeenCalledWith(3);

        map.set("key1", 2);
        expect(handler).toHaveBeenCalledTimes(3);
        expect(handler).toHaveBeenCalledWith(5);

        map.delete("key0");
        expect(handler).toHaveBeenCalledTimes(4);
        expect(handler).toHaveBeenCalledWith(2);

        map.clear();
        expect(handler).toHaveBeenCalledTimes(5);
        expect(handler).toHaveBeenCalledWith(0);
    });

    // 在 autorun 中通过 forEach 迭代 map 获取值
    test("should autorun forEach iteration", () => {
        const handler = jest.fn();
        const map = observable(new Map<string, number>());

        autorun(() => {
            let sum = 0;
            map.forEach(num => (sum += num));
            handler(sum);
        });

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenLastCalledWith(0);

        map.set("key0", 3);
        expect(handler).toHaveBeenCalledTimes(2);
        expect(handler).toHaveBeenLastCalledWith(3);

        map.set("key1", 2);
        expect(handler).toHaveBeenCalledTimes(3);
        expect(handler).toHaveBeenLastCalledWith(5);

        map.delete("key0");
        expect(handler).toHaveBeenCalledTimes(4);
        expect(handler).toHaveBeenLastCalledWith(2);

        map.clear();
        expect(handler).toHaveBeenCalledTimes(5);
        expect(handler).toHaveBeenLastCalledWith(0);
    });

    // 在 autorun 中通过 for of 迭代 map.keys 获取值
    test("should autorun keys iteration", () => {
        const handler = jest.fn();
        const map = observable(new Map<number, number>());

        autorun(() => {
            let sum = 0;
            for (let key of map.keys()) {
                sum += key;
            }
            handler(sum);
        });

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenLastCalledWith(0);

        map.set(4, 3);
        expect(handler).toHaveBeenCalledTimes(2);
        expect(handler).toHaveBeenLastCalledWith(4);

        map.set(1, 3);
        expect(handler).toHaveBeenCalledTimes(3);
        expect(handler).toHaveBeenLastCalledWith(5);

        map.delete(4);
        expect(handler).toHaveBeenCalledTimes(4);
        expect(handler).toHaveBeenLastCalledWith(1);

        map.clear();
        expect(handler).toHaveBeenCalledTimes(5);
        expect(handler).toHaveBeenLastCalledWith(0);
    });

    // 在 autorun 中通过 for of 迭代 map.values 获取值
    test("should autorun values iteration", () => {
        const handler = jest.fn();
        const map = observable(new Map<string, number>());

        autorun(() => {
            let sum = 0;
            for (let num of map.values()) {
                sum += num;
            }
            handler(sum);
        });

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenLastCalledWith(0);

        map.set("key0", 3);
        expect(handler).toHaveBeenCalledTimes(2);
        expect(handler).toHaveBeenLastCalledWith(3);

        map.set("key1", 2);
        expect(handler).toHaveBeenCalledTimes(3);
        expect(handler).toHaveBeenLastCalledWith(5);

        map.delete("key0");
        expect(handler).toHaveBeenCalledTimes(4);
        expect(handler).toHaveBeenLastCalledWith(2);

        map.clear();
        expect(handler).toHaveBeenCalledTimes(5);
        expect(handler).toHaveBeenLastCalledWith(0);
    });

    // 在 autorun 中通过 for of 迭代 map.entries 获取值
    test("should autorun entries iteration", () => {
        const handler = jest.fn();
        const map = observable(new Map<string, number>());

        autorun(() => {
            let sum = 0;
            for (let [, num] of map.entries()) {
                sum += num;
            }
            handler(sum);
        });

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenLastCalledWith(0);

        map.set("key0", 3);
        expect(handler).toHaveBeenCalledTimes(2);
        expect(handler).toHaveBeenLastCalledWith(3);

        map.set("key1", 2);
        expect(handler).toHaveBeenCalledTimes(3);
        expect(handler).toHaveBeenLastCalledWith(5);

        map.delete("key0");
        expect(handler).toHaveBeenCalledTimes(4);
        expect(handler).toHaveBeenLastCalledWith(2);

        map.clear();
        expect(handler).toHaveBeenCalledTimes(5);
        expect(handler).toHaveBeenLastCalledWith(0);
    });

    // 在 autorun 中通过 map.clear 触发响应
    test("should be triggered by clearing", () => {
        const handler = jest.fn();
        const map = observable(new Map<string, number>());

        autorun(() => handler(map.get("key")));
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenLastCalledWith(undefined);

        map.set("key", 3);
        expect(handler).toHaveBeenCalledTimes(2);
        expect(handler).toHaveBeenLastCalledWith(3);

        map.clear();
        expect(handler).toHaveBeenCalledTimes(3);
        expect(handler).toHaveBeenLastCalledWith(undefined);
    });

    // 在 autorun 中不响应错误的 map 自定义属性
    test("should not autorun custom property mutations", () => {
        const handler = jest.fn();
        const map = observable(new Map<string, string>());

        // @ts-ignore
        autorun(() => handler(map['customProp']));

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(undefined);

        // @ts-ignore
        map["customProp"] = "Hello world";
        expect(handler).toHaveBeenCalledTimes(1);
    });

    // 在 autorun 中不响应未更新的数据
    test("should not autorun non value changing mutations", () => {
        const handler = jest.fn();
        const map = observable(new Map());

        autorun(() => handler(map.get("key")));
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(undefined);

        map.set("key", "value");
        expect(handler).toHaveBeenCalledTimes(2);
        expect(handler).toHaveBeenLastCalledWith("value");

        // 重复设置相同的 item 不会触发响应
        map.set("key", "value");
        expect(handler).toHaveBeenCalledTimes(2);

        map.delete("key");
        expect(handler).toHaveBeenCalledTimes(3);
        expect(handler).toHaveBeenLastCalledWith(undefined);

        // 重复删除 item 不会触发响应
        map.delete("key");
        expect(handler).toHaveBeenCalledTimes(3);

        // 清空一个本身为空的 map 也不会触发响应
        map.clear();
        expect(handler).toHaveBeenCalledTimes(3);
    });

    // 在 autorun 中不响应 map 类型原始数据
    test("should not autorun raw data", () => {
        const handler = jest.fn();
        const map = observable(new Map());

        // 在响应中依赖原始的 Map.key，除了初始化响应 1 次，不再响应更新
        autorun(() => handler(raw(map).get("key")));
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(undefined);

        map.set("key", "value");
        expect(handler).toHaveBeenCalledTimes(1);

        map.delete("key");
        expect(handler).toHaveBeenCalledTimes(1);
    });

    // 在 autorun 中不响应 map 类型原始数据迭代
    test("should not autorun raw iterations", () => {
        const handler = jest.fn();
        const map = observable(new Map());

        // 通过 raw 拿到的原始数据不会响应数据迭代
        autorun(() => {
            const dataRaw = raw(map);
            let sum = 0;

            for (let [, num] of dataRaw.entries()) {
                sum += num;
            }

            for (let key of dataRaw.keys()) {
                sum += dataRaw.get(key);
            }

            for (let num of dataRaw.values()) {
                sum += num;
            }

            for (let [, num] of dataRaw) {
                sum += num;
            }
            handler(sum);
        });

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(0);

        map.set("key1", 2);
        map.set("key2", 3);
        expect(handler).toHaveBeenCalledTimes(1);

        map.delete("key1");
        expect(handler).toHaveBeenCalledTimes(1);
    });

    // 在 autorun 中不响应 map 类型原始数据的增删操作
    test("should not be triggered by raw mulations", () => {
        const handler = jest.fn();
        const map = observable(new Map());
        const dataRaw = raw(map);

        autorun(() => handler(map.get("key")));
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenLastCalledWith(undefined);

        dataRaw.set("key", "hello");
        expect(handler).toHaveBeenCalledTimes(1);

        dataRaw.delete("key");
        expect(handler).toHaveBeenCalledTimes(1);

        dataRaw.clear();
        expect(handler).toHaveBeenCalledTimes(1);
    });

    // 在 autorun 中不响应 map 类型原始数据长度
    test("should not autorun raw size mutations", () => {
        const handler = jest.fn();
        const map = observable(new Map());

        autorun(() => handler(raw(map).size));
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(0);

        map.set("key", "value");
        expect(handler).toHaveBeenCalledTimes(1);
    });

    // 在 autorun 中不响应 map 类型原始数据添加
    test("should not be triggered by raw size mutaitions", () => {
        const handler = jest.fn();
        const map = observable(new Map());

        autorun(() => handler(map.size));
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(0);

        raw(map).set("key", "value");
        expect(handler).toHaveBeenCalledTimes(1);
    });

    // map 类型的 observable 对象中允许使用 object 作为 key
    test("should support object as key", () => {
        const handler = jest.fn();
        const key = {};

        const map = observable(new Map());
        autorun(() => handler(map.get(key)));

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(undefined);

        map.set(key, 1);
        expect(handler).toHaveBeenCalledTimes(2);
        expect(handler).toHaveBeenLastCalledWith(1);

        // {} !== key
        map.set({}, 2);
        expect(handler).toHaveBeenCalledTimes(2);
        expect(handler).toHaveBeenLastCalledWith(1);
    });

    // map 类型的 observable 对象中允许设置一个普通对象，或是 observable 对象作为 value
    test("observer object", () => {
        const handler = jest.fn();
        const map = observable(new Map<string, Partial<Record<string, string>>>([]));

        map.set("key", {});
        map.set("key2", observable({}));

        autorun(() => {
            const [obs1, obs2] = map.values();
            handler(obs1.aa, obs2.aa);
        });

        expect(handler).toHaveBeenCalledTimes(1);
        const obs1 = map.get("key");
        const obs2 = map.get("key2");

        if (obs1) obs1.aa = "123";
        expect(handler).toHaveBeenCalledTimes(2);

        if (obs2) obs2.aa = "234";
        expect(handler).toHaveBeenCalledTimes(3);
    });

    // 浅劫持 map 对象，不会响应对象的属性值修改
    test("shallow", () => {
        const handler = jest.fn();
        const map = observable.shallow(new Map<string, Partial<Record<string, string>>>([]));

        map.set("key", {});
        autorun(() => {
            const [obs] = map.values();
            handler(obs.aa);
        });

        expect(handler).toHaveBeenCalledTimes(1);
        const obs = map.get("key");

        // 浅劫持对象不会响应修改对象的属性
        if (obs) obs.aa = "123";
        expect(obs).toBeDefined();
        expect(handler).toHaveBeenCalledTimes(1);
    });
});