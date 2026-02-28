import { autorun, batch, define, model, observable, observe } from "@formily/reactive";
import { FormPath } from "@formily/shared";

// 手动定义领域模型
describe("makeObservable", () => {
  // define + observable，响应手动定义领域模型
  test("observable annotation", () => {
    const target: any = { aa: {} };
    define(target, {
      aa: observable,
    });

    const handler = jest.fn();
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    // autorun 是浅劫持监听，observe 支持深度劫持监听也支持浅劫持监听
    autorun(() => handler(FormPath.getIn(target, "aa.bb.cc")));
    observe(target, handler1);
    observe(target.aa, handler2);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler1).toHaveBeenCalledTimes(0);
    expect(handler2).toHaveBeenCalledTimes(0);

    target.aa.bb = { cc: { dd: { ee: 123 } } };
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);

    target.aa = { hh: 123 };
    expect(handler).toHaveBeenCalledTimes(3);
    expect(handler1).toHaveBeenCalledTimes(2);
    expect(handler2).toHaveBeenCalledTimes(2);

    expect(handler).toHaveBeenNthCalledWith(1, undefined);
    expect(handler).toHaveBeenNthCalledWith(2, { dd: { ee: 123 } });

    // 第三次设置的时候是将 target.aa 整个赋值，所以 aa.bb.cc 已覆盖不存在
    expect(handler).toHaveBeenNthCalledWith(3, undefined);
  });

  // define + observable.shallow，响应手动定义浅劫持领域模型
  test("shallow annotation", () => {
    const target: any = { aa: {} };
    define(target, {
      aa: observable.shallow,
    });

    const handler = jest.fn();
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    // autorun 是浅劫持监听，observe 支持深度劫持监听也支持浅劫持监听
    autorun(() => handler(FormPath.getIn(target, "aa.bb.cc")));
    observe(target, handler1);
    observe(target.aa, handler2);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler1).toHaveBeenCalledTimes(0);
    expect(handler2).toHaveBeenCalledTimes(0);

    // 修改浅劫持对象属性会触发响应
    target.aa.bb = { cc: { dd: { ee: 123 } } };
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);

    // 这个时候传递的对象
    expect(handler).toHaveBeenNthCalledWith(2, { dd: { ee: 123 } });

    // 深度修改浅劫持对象下的叶子节点不会触发响应
    target.aa.bb.cc.kk = 333;
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);

    // 虽然不会响应，但是传递的对象引用地址已发生变更
    expect(handler).toHaveBeenNthCalledWith(2, { dd: { ee: 123 }, kk: 333 });

    // 直接修改浅劫持对象触发响应
    target.aa = { hh: 123 };
    expect(handler).toHaveBeenCalledTimes(3);
    expect(handler1).toHaveBeenCalledTimes(2);
    expect(handler2).toHaveBeenCalledTimes(2);

    expect(handler).toHaveBeenNthCalledWith(1, undefined);
    expect(handler.mock.calls[1][0]).toMatchObject({ dd: { ee: 123 } });
    expect(handler).toHaveBeenNthCalledWith(3, undefined);
  });

  // define + observable.box，响应手动定义一个带有 get/set 方法的领域模型
  test("box annotation", () => {
    const target: any = {};
    define(target, { aa: observable.box });

    const handler = jest.fn();
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    autorun(() => handler(target.aa.get()));
    observe(target, handler1);
    observe(target.aa, handler2);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler1).toHaveBeenCalledTimes(0);
    expect(handler2).toHaveBeenCalledTimes(0);
    expect(handler).toHaveBeenLastCalledWith(undefined);

    target.aa.set(123);
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenLastCalledWith(123);
  });

  // define + observable.ref，响应手动定义一个领域模型的引用
  test("ref annotation", () => {
    const target: any = {};
    define(target, {
      aa: observable.ref,
    });

    const handler = jest.fn();
    const handler1 = jest.fn();

    autorun(() => handler(target.aa));
    observe(target, handler1);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenLastCalledWith(undefined);
    expect(handler1).toHaveBeenCalledTimes(0);

    target.aa = 123;
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenLastCalledWith(123);
    expect(handler1).toHaveBeenCalledTimes(1);
  });

  // define + observable + batch，批量操作中响应手动定义的领域模型
  test("action annotation", () => {
    const target: any = {
      aa: { bb: null, cc: null },
      setData(data: number[]) {
        target.aa.bb = data[0] ?? 0;
        target.aa.cc = data[1] ?? 0;
      },
    };
    define(target, {
      aa: observable,
      setData: batch,
    });

    const handler = jest.fn();
    autorun(() => handler([target.aa.bb, target.aa.cc]));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenLastCalledWith([null, null]);

    target.setData([123, 321]);
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenLastCalledWith([123, 321]);
  });

  // define + observable.computed，响应手动定义一个领域模型的计算缓存器
  test("computed annotation", () => {
    const handler = jest.fn();
    const target = {
      aa: 11,
      bb: 22,
      get cc() {
        handler();
        return this.aa + this.bb;
      },
    };

    define(target, {
      aa: observable,
      bb: observable,
      cc: observable.computed,
    });

    autorun(() => target.cc);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(target.cc).toBe(33);

    target.aa = 22;
    expect(handler).toHaveBeenCalledTimes(2);
    expect(target.cc).toBe(44);
  });

  // define 手动定义领域模型容错机制
  test("unexpect target", () => {
    const testFn = jest.fn();
    const testArr: string[] = [];

    // @ts-ignore
    const obs1 = define(4, { value: observable.computed });

    // @ts-ignore
    const obs2 = define("123", { value: observable.computed });

    // @ts-ignore
    const obs3 = define(testFn, { value: observable.computed });

    // @ts-ignore
    const obs4 = define(testArr, { value: observable.computed });

    expect(obs1).toBe(4);
    expect(obs2).toBe("123");
    expect(obs3).toBe(testFn);
    expect(obs4).toBe(testArr);
  });
});

// model 快速定义领域模型
test("define model", () => {
  // getter/setter 属性自动声明 computed
  const obs = model({
    // 普通属性自动声明 observable
    aa: 1,
    // 函数自动声明 action（批量操作）
    action() {
      this.aa++;
    },
  });

  expect(obs.aa).toBe(1);
  const { action } = obs;

  action();
  expect(obs.aa).toBe(2);
});
