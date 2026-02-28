import { autorun, observable, raw } from "@formily/reactive";

// 劫持 Set 类型对象作为 observable 对象
describe("Set", () => {
  // 创建一个 set 类型的 observable 对象
  test("should be a proper JS Set", () => {
    const set = observable(new Set());
    expect(set).toBeInstanceOf(Set);
    expect(raw(set)).toBeInstanceOf(Set);
  });

  // 在 autorun 中响应 set 类型对象
  test("should autorun mutations", () => {
    const handler = jest.fn();
    const set = observable(new Set());

    // 默认组织性格一次
    autorun(() => handler(set.has("alue")));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(false);

    // 由于 auturun 收集的依赖是 alue，而不是 value，所以这里不会响应
    set.add("value");
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenLastCalledWith(false);

    // 重新再来一次
    autorun(() => handler(set.has("value")));
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledWith(true);

    // 重新再来一次，监听新的值
    autorun(() => handler(set.has("newValue")));
    expect(handler).toHaveBeenCalledTimes(3);
    expect(handler).toHaveBeenCalledWith(false);

    set.add("newValue");
    expect(handler).toHaveBeenCalledTimes(4);
    expect(handler).toHaveBeenLastCalledWith(true);

    set.delete("newValue");
    expect(handler).toHaveBeenCalledTimes(5);
    expect(handler).toHaveBeenLastCalledWith(false);
  });

  // 在 autorun 中响应 set.size
  test("should autorun size mutations", () => {
    const handler = jest.fn();
    const set = observable(new Set());

    autorun(() => handler(set.size));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(0);

    set.add("value");
    set.add("value2");
    expect(handler).toHaveBeenCalledTimes(3);
    expect(handler).toHaveBeenCalledWith(2);

    set.delete("value");
    expect(handler).toHaveBeenCalledTimes(4);
    expect(handler).toHaveBeenCalledWith(1);

    set.clear();
    expect(handler).toHaveBeenCalledTimes(5);
    expect(handler).toHaveBeenCalledWith(0);
  });

  // 在 autorun 中通过 for of 迭代 set
  test("should autorun for of iteration", () => {
    const handler = jest.fn();
    const set = observable(new Set<number>());

    autorun(() => {
      let sum = 0;
      for (let num of set) {
        sum += num;
      }
      handler(sum);
    });
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(0);

    set.add(3);
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledWith(3);

    set.add(2);
    expect(handler).toHaveBeenCalledTimes(3);
    expect(handler).toHaveBeenCalledWith(5);

    set.delete(3);
    expect(handler).toHaveBeenCalledTimes(4);
    expect(handler).toHaveBeenCalledWith(2);

    set.clear();
    expect(handler).toHaveBeenCalledTimes(5);
    expect(handler).toHaveBeenCalledWith(0);
  });

  // 在 autorun 中通过 forEach 迭代 set
  test("should autorun forEach iteration", () => {
    const handler = jest.fn();
    const set = observable(new Set<number>());

    autorun(() => {
      let sum = 0;
      set.forEach(num => (sum += num));
      handler(sum);
    });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(0);

    set.add(3);
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledWith(3);

    set.add(2);
    expect(handler).toHaveBeenCalledTimes(3);
    expect(handler).toHaveBeenCalledWith(5);

    set.delete(3);
    expect(handler).toHaveBeenCalledTimes(4);
    expect(handler).toHaveBeenCalledWith(2);

    set.clear();
    expect(handler).toHaveBeenCalledTimes(5);
    expect(handler).toHaveBeenCalledWith(0);
  });

  // 在 autorun 中通过 for of 迭代 set.keys 获取值
  test("should autorun keys iteration", () => {
    const handler = jest.fn();
    const set = observable(new Set<number>());

    autorun(() => {
      let sum = 0;
      for (let key of set.keys()) {
        sum += key;
      }
      handler(sum);
    });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(0);

    set.add(3);
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledWith(3);

    set.add(2);
    expect(handler).toHaveBeenCalledTimes(3);
    expect(handler).toHaveBeenCalledWith(5);

    set.delete(3);
    expect(handler).toHaveBeenCalledTimes(4);
    expect(handler).toHaveBeenCalledWith(2);

    set.clear();
    expect(handler).toHaveBeenCalledTimes(5);
    expect(handler).toHaveBeenCalledWith(0);
  });

  // 在 autorun 中通过 for of 迭代 set.values 获取值
  test("should autorun values iteration", () => {
    const handler = jest.fn();
    const set = observable(new Set<number>());

    // 由于 set 只有 键值，所以 keys 和 values 是一样的
    autorun(() => {
      let sum = 0;
      for (let num of set.values()) {
        sum += num;
      }
      handler(sum);
    });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(0);

    set.add(3);
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledWith(3);

    set.add(2);
    expect(handler).toHaveBeenCalledTimes(3);
    expect(handler).toHaveBeenCalledWith(5);

    set.delete(3);
    expect(handler).toHaveBeenCalledTimes(4);
    expect(handler).toHaveBeenCalledWith(2);

    set.clear();
    expect(handler).toHaveBeenCalledTimes(5);
    expect(handler).toHaveBeenCalledWith(0);
  });

  // 在 autorun 中通过 `for of` 迭代 `set.entries` 获取值
  test("should autorun entries iteration", () => {
    const handler = jest.fn();
    const set = observable(new Set<number>());

    // entries 拿到数组第一个值第二个值都是一样的，取哪个都可以
    autorun(() => {
      let sum = 0;
      for (let [, num] of set.entries()) {
        sum += num;
      }
      handler(sum);
    });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(0);

    set.add(3);
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledWith(3);

    set.add(2);
    expect(handler).toHaveBeenCalledTimes(3);
    expect(handler).toHaveBeenCalledWith(5);

    set.delete(3);
    expect(handler).toHaveBeenCalledTimes(4);
    expect(handler).toHaveBeenCalledWith(2);

    set.clear();
    expect(handler).toHaveBeenCalledTimes(5);
    expect(handler).toHaveBeenCalledWith(0);
  });

  // 在 autorun 中不响应 set 错误的自定义属性
  test("should not autorun custom property mutations", () => {
    const handler = jest.fn();
    const set = observable(new Set());

    // @ts-ignore 这样写在 eslint 是错误的
    autorun(() => handler(set["customProp"]));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(undefined);

    // @ts-ignore
    set["customProp"] = "Hello world";
    expect(handler).toHaveBeenCalledTimes(1);
  });

  // 在 autorun 中不响应没有变更的 Set 对象
  test("should not autorun non value changing mutations", () => {
    const handler = jest.fn();
    const set = observable(new Set());

    autorun(() => handler(set.has("value")));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(false);

    set.add("value");
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledWith(true);

    set.add("value");
    expect(handler).toHaveBeenCalledTimes(2);

    set.delete("value");
    expect(handler).toHaveBeenCalledTimes(3);
    expect(handler).toHaveBeenCalledWith(false);

    set.delete("value");
    expect(handler).toHaveBeenCalledTimes(3);

    // 清空一个空的 set 对象不会触发响应
    set.clear();
    expect(handler).toHaveBeenCalledTimes(3);
  });

  // 在 autorun 中不响应 set 类型原生数据迭代
  test("should not autorun raw iterations", () => {
    const handler = jest.fn();
    const set = observable(new Set<number>());

    autorun(() => {
      const dataRaw = raw(set);
      let sum = 0;

      for (let [, num] of dataRaw.entries()) {
        sum += num;
      }

      for (let key of dataRaw.keys()) {
        sum += key;
      }

      for (let num of dataRaw.values()) {
        sum += num;
      }

      dataRaw.forEach(num => (sum += num));
      handler(sum);
    });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(0);

    set.add(2);
    set.add(3);
    expect(handler).toHaveBeenCalledTimes(1);

    set.delete(2);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  // 在 autorun 中不响应 set 类型原生数据的新增、删除
  test("should not be triggered by raw mutations", () => {
    const handler = jest.fn();
    const set = observable(new Set());
    const dataRaw = raw(set);

    autorun(() => handler(set.has("value")));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(false);

    dataRaw.add("value");
    dataRaw.delete("value");
    dataRaw.clear();
    expect(handler).toHaveBeenCalledTimes(1);
  });

  // 在 autorun 中不响应 set 类型原生数据的 set.size
  test("should not autorun raw size mutations", () => {
    const handler = jest.fn();
    const set = observable(new Set());

    autorun(() => handler(raw(set).size));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(0);

    set.add("value");
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(0);
  });

  // 在 autorun 中不响应来自 set 类型原生数据添加的项目
  test("should not be triggered by raw size mutations", () => {
    const handler = jest.fn();
    const set = observable(new Set());

    autorun(() => handler(set.size));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(0);

    raw(set).add("value");
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(0);
  });
});
