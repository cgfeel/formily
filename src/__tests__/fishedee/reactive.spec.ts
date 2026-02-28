import {
  Tracker,
  action,
  autorun,
  batch,
  define,
  model,
  observable,
  observe,
  reaction,
} from "@formily/reactive";

// 来自文档，单元测试纠正了文档中的一些错误
// https://blog.fishedee.com/2021/07/13/Formily%E7%9A%84Reactive%E7%9A%84%E7%BB%8F%E9%AA%8C%E6%B1%87%E6%80%BB
// 6.1 是错的，正确的是 batch 在 autorun 依旧会收集依赖

describe("observable", () => {
  test("testObservable1", () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const obs = observable({
      aa: { bb: 123 },
      cc: { dd: 123 },
    });

    autorun(() => handler1(obs.aa.bb));
    autorun(() => handler2(obs.cc.dd));

    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);

    obs.aa.bb = 44;
    expect(handler1).toHaveBeenCalledTimes(2);

    // 没有修改值
    obs.cc.dd = 123;
    expect(handler2).toHaveBeenCalledTimes(1);
  });

  test("testObservable2", () => {
    const obs = observable({
      aa: { bb: 123 },
      cc: { dd: 123 },
      ee: { ff: 123 },
      gg: { hh: 123 },
    });

    const handler = jest.fn();
    expect(handler).toHaveBeenCalledTimes(0);

    autorun(() => handler(obs.aa));
    autorun(() => handler(obs.cc));
    autorun(() => handler(obs.ee));
    autorun(() => handler(obs.gg.hh));

    expect(handler).toHaveBeenCalledTimes(4);
    expect(handler).toHaveBeenNthCalledWith(1, { bb: 123 });
    expect(handler).toHaveBeenNthCalledWith(2, { dd: 123 });
    expect(handler).toHaveBeenNthCalledWith(3, { ff: 123 });
    expect(handler).toHaveBeenNthCalledWith(4, 123);

    obs.aa.bb = 44;
    obs.cc = { dd: 456 };
    obs.ee = { ff: 123 };
    obs.gg = { hh: 45 };

    expect(handler).toHaveBeenCalledTimes(7);
    expect(handler).toHaveBeenNthCalledWith(5, { dd: 456 });
    expect(handler).toHaveBeenNthCalledWith(6, { ff: 123 });
    expect(handler).toHaveBeenNthCalledWith(7, 45);
  });

  test("testObservable3", () => {
    const obs = observable({
      aa: { bb: ["a"] },
    });

    const handler = jest.fn();
    expect(handler).toHaveBeenCalledTimes(0);

    autorun(() => handler(obs.aa.bb));
    autorun(() => handler(obs.aa.bb.length));
    autorun(() => handler(obs.aa.bb[1]));

    expect(handler).toHaveBeenCalledTimes(3);
    expect(handler).toHaveBeenNthCalledWith(1, ["a"]);
    expect(handler).toHaveBeenNthCalledWith(2, 1);
    expect(handler).toHaveBeenNthCalledWith(3, undefined);

    obs.aa.bb.push("cc");

    expect(handler).toHaveBeenCalledTimes(5);

    // 注意了这里第 4 个是传入的是 `obs.aa.bb[1]` 然后才是判断 obs.aa.length
    // 不是按照上下文执行顺序
    // 因为 push 的时候先赋值，成功之后再修改 length
    expect(handler).toHaveBeenNthCalledWith(4, "cc");
    expect(handler).toHaveBeenNthCalledWith(5, 2);
  });

  test("testObservable4", () => {
    const obs = observable({
      aa: { bb: ["a"] },
      cc: "78",
    });

    const handler = jest.fn();
    autorun(() => handler(obs.cc));

    obs.aa.bb.push("cc");
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test("testObservableShadow", () => {
    const obs = observable.shallow({
      aa: { bb: "a" },
      cc: { dd: "a" },
    });

    const handler1 = jest.fn();
    const handler2 = jest.fn();

    autorun(() => handler1(obs.aa.bb));
    autorun(() => handler2(obs.cc));

    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);

    obs.aa.bb = "123";
    obs.cc = { dd: "123" };

    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(2);
  });

  test("testObservable1_object", () => {
    const handler = jest.fn();
    const obs = observable({
      aa: { bb: 123 },
    });

    autorun(() => handler(obs.aa));
    expect(handler).toHaveBeenCalledTimes(1);

    obs.aa.bb = 44;
    expect(handler).toHaveBeenCalledTimes(1);

    obs.aa = { bb: 321 };
    expect(handler).toHaveBeenCalledTimes(2);
  });

  test("testObservable2_object", () => {
    const handler = jest.fn();
    const obs = observable({
      aa: { bb: 123 },
    });

    autorun(() => {
      const mk = obs.aa;
      handler(mk);
    });
    expect(handler).toHaveBeenCalledTimes(1);

    obs.aa.bb = 44;
    expect(handler).toHaveBeenCalledTimes(1);

    obs.aa = { bb: 321 };
    expect(handler).toHaveBeenCalledTimes(2);
  });

  test("testObservable3_object", () => {
    const obs = observable<{ aa: Partial<Record<string, number>> }>({ aa: {} });
    const handler = jest.fn();

    autorun(() => handler(obs.aa));
    expect(handler).toHaveBeenCalledTimes(1);

    obs.aa.bb = 4;
    obs.aa.bb = 5;

    delete obs.aa.bb;
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test("testObservable4_object", () => {
    const obs = observable<{ aa: Partial<Record<string, number>> }>({ aa: {} });
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    autorun(() => {
      for (const i in obs.aa) {
        handler1(i);
      }
      handler2();
    });
    expect(handler1).toHaveBeenCalledTimes(0);
    expect(handler2).toHaveBeenCalledTimes(1);

    // 相当于 addProperty
    obs.aa.bb = 4;
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(2);

    // 修改值则不会继续触发了
    obs.aa.bb = 5;
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(2);

    // 相当于 removeProperty
    // 但是由于 obs.aa 本身没有值，所以不触发 handler1
    delete obs.aa.bb;
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(3);
  });

  test("testObservable1_array", () => {
    const obs = observable<number[]>([]);
    const handler = jest.fn();

    autorun(() => handler(obs));
    expect(handler).toHaveBeenCalledTimes(1);

    obs.push(1);
    obs[0] = 3;
    obs.push(4);
    obs.pop();
    obs[0] = 5;

    expect(handler).toHaveBeenCalledTimes(1);
  });

  test("testObservable2_array", () => {
    const handler = jest.fn();
    const obs = observable<number[]>([]);

    autorun(() => handler(obs.length));
    expect(handler).toHaveBeenCalledTimes(1);

    obs.push(1);
    expect(handler).toHaveBeenCalledTimes(2);

    obs[0] = 3;
    expect(handler).toHaveBeenCalledTimes(2);

    obs.push(4);
    expect(handler).toHaveBeenCalledTimes(3);

    /**
     * 执行了 2 次，神奇不
     * 因为 pop 方法既涉及到 “获取（getting）” 又涉及到 “设置（setting）”，所以将会执行两次。
     *  1. 获取最后一个元素值（get 操作 array.length）。
     *  2. 删除最后一个元素并更新数组长度（set 操作 array = newData）。
     * 由于这两步都被代理，所以 pop 操作会触发 Proxy 的 get 和 set trap，从而使得 pop 方法在 Proxy 对象上执行了两次。
     */
    obs.pop();
    expect(handler).toHaveBeenCalledTimes(5);

    obs[0] = 5;
    expect(handler).toHaveBeenCalledTimes(5);
  });

  test("testObservable2_set", () => {
    const handler = jest.fn();
    const obs = observable(new Set<number>([]));

    autorun(() => handler(obs.size));
    expect(handler).toHaveBeenCalledTimes(1);

    obs.add(1);
    expect(handler).toHaveBeenCalledTimes(2);

    obs.add(2);
    expect(handler).toHaveBeenCalledTimes(3);

    // Set 类型 delete 不会执行 2 次
    obs.delete(1);
    expect(handler).toHaveBeenCalledTimes(4);
  });

  test("testObservable2_map", () => {
    const handler = jest.fn();
    const obs = observable(new Map());

    autorun(() => handler(obs.size));
    expect(handler).toHaveBeenCalledTimes(1);

    obs.set("ob1", 1);
    expect(handler).toHaveBeenCalledTimes(2);

    obs.set("ob1", 2);
    expect(handler).toHaveBeenCalledTimes(2);

    obs.set("ob2", 3);
    expect(handler).toHaveBeenCalledTimes(3);

    // map 也只删除 1 次
    obs.delete("ob1");
    expect(handler).toHaveBeenCalledTimes(4);
  });

  test("testObservable3_array", () => {
    const obs = observable<Array<any>>([]);
    const handler = jest.fn();

    // array 的 map 会随数组每一项增删改触发 getting
    autorun(() => handler(obs.map(item => item)));
    expect(handler).toHaveBeenCalledTimes(1);

    obs.push(1);
    obs[0] = 3;
    obs.push({});
    expect(handler).toHaveBeenCalledTimes(4);

    // 数组下的对象属性值修改不会触发数组 map
    obs[1].kk = 3;
    expect(handler).toHaveBeenCalledTimes(4);

    // 数组 pop 一定 +2，读取 length 1 次，重新赋值 1 次
    obs.pop();
    expect(handler).toHaveBeenCalledTimes(6);

    obs[0] = 5;
    expect(handler).toHaveBeenCalledTimes(7);
  });

  test("testRef", () => {
    const ref = observable.ref(1);
    const handler = jest.fn();

    autorun(() => handler(ref.value));
    expect(handler).toHaveBeenCalledTimes(1);

    ref.value = 123;
    expect(handler).toHaveBeenCalledTimes(2);
  });

  test("testBox", () => {
    const ref = observable.box(1);
    const handler = jest.fn();

    autorun(() => handler(ref.get()));
    expect(handler).toHaveBeenCalledTimes(1);

    ref.set(123);
    expect(handler).toHaveBeenCalledTimes(2);
  });
});

describe("autorun", () => {
  test("testAutoRun1", () => {
    const obs = observable({ aa: 78 });
    const handler = jest.fn();

    const dispose = autorun(() => handler(obs.aa));
    expect(handler).toHaveBeenCalledTimes(1);

    obs.aa = 123;
    expect(handler).toHaveBeenCalledTimes(2);

    dispose();
    obs.aa = 321;

    expect(handler).toHaveBeenCalledTimes(2);
  });

  test("testAutoRun2", () => {
    const obs = observable({ aa: 1, bb: 3 });
    const handler = jest.fn();

    autorun(() => handler(obs.aa === 1 || obs.bb === 2));
    expect(handler).toHaveBeenCalledTimes(1);

    // 这里不会响应，因为 aa === 1 是 true，不会收集 bb 的依赖
    obs.bb = 4;
    expect(handler).toHaveBeenCalledTimes(1);

    // 修改 aa = 2 之后，会收集 bb 的依赖
    obs.aa = 2;
    obs.bb = 2;

    expect(handler).toHaveBeenCalledTimes(3);
  });
});

describe("computed", () => {
  test("testComputed", () => {
    const obs = observable({ aa: 11, bb: 22 });
    const computed = observable.computed(() => obs.aa + obs.bb);

    const handler = jest.fn();
    autorun(() => handler(computed.value));

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenLastCalledWith(33);

    obs.aa = 33;
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenLastCalledWith(55);
  });
});

describe("reaction", () => {
  test("testReaction1", () => {
    const obs = observable({ aa: 1, bb: 2 });
    const handler = jest.fn();

    // 将 handler 作为 subscrible 是不会在初始化的时候执行
    const dispose = reaction(() => obs.aa + obs.bb, handler);
    expect(handler).toHaveBeenCalledTimes(0);

    obs.aa = 4;
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(6, 3);

    dispose();
  });

  // 在文档中试图用 computed + autorun 证明等同于 reaction，实际是不对的
  test("testReaction2", () => {
    const obs = observable({ aa: 1, bb: 2 });
    const handler = jest.fn();

    const computed = observable.computed(() => obs.aa + obs.bb);
    const dispose = autorun(() => handler(computed.value));

    obs.aa = 4;

    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenNthCalledWith(1, 3);
    expect(handler).toHaveBeenNthCalledWith(2, 6);

    dispose();
  });

  // reaction 拥有一个 track 函数和一个 subscrible 组成
  test("testReaction3", () => {
    const obs = observable({ aa: 1, bb: 2 });
    const tracked = jest.fn(num => num);
    const subscrible = jest.fn();

    // track 函数一定要返回值进行脏检查
    const dispose = reaction(() => tracked(obs.aa + obs.bb), subscrible);
    expect(tracked).toHaveBeenCalledTimes(1);
    expect(subscrible).toHaveBeenCalledTimes(0);

    obs.aa = 4;
    expect(tracked).toHaveBeenCalledTimes(2);
    expect(subscrible).toHaveBeenCalledTimes(1);

    dispose();
  });

  // 补一个让文档作者假想成立的条件，初始化触发 subscrible
  test("testReaction4", () => {
    const obs = observable({ aa: 1, bb: 2 });
    const tracked = jest.fn(num => num);
    const subscrible = jest.fn();

    // track 函数一定要返回值进行脏检查
    const dispose = reaction(() => tracked(obs.aa + obs.bb), subscrible, {
      fireImmediately: true,
    });

    expect(tracked).toHaveBeenCalledTimes(1);
    expect(subscrible).toHaveBeenCalledTimes(1);

    obs.aa = 4;
    expect(tracked).toHaveBeenCalledTimes(2);
    expect(subscrible).toHaveBeenCalledTimes(2);

    expect(subscrible).toHaveBeenNthCalledWith(1, 3, 3);
    expect(subscrible).toHaveBeenNthCalledWith(2, 6, 3);
    dispose();
  });
});

describe("Tracker", () => {
  // 理解 Track 只用两点：
  // 1. Track 每次响应只触发构造函数中的 scheduler
  // 2. 每次都需要通过通过实例 track.view 触发响应，第一次需要手动在外部执行一次
  test("testTracker", () => {
    const obs = observable({ aa: 11 });
    const handler = jest.fn();

    const view = () => handler(obs.aa);
    const scheduler = () => tracked.track(view);

    const tracked = new Tracker(scheduler);

    tracked.track(view);
    expect(handler).toHaveBeenCalledTimes(1);

    obs.aa = 22;
    expect(handler).toHaveBeenCalledTimes(2);
  });
});

describe("observe", () => {
  // observe 和 autorun 的区别：
  // autorun 只能作为浅响应，observe 默认深响应，也可以作为浅响应
  // observe 初始化不响应
  test("testObserve", () => {
    const obs = observable({ aa: 11, bb: [1] });
    const handler = jest.fn();

    observe(obs, handler);
    expect(handler).toHaveBeenCalledTimes(0);

    obs.aa = 22;
    expect(handler).toHaveBeenCalledTimes(1);

    obs.bb.push(2);
    obs.bb.push(3);
    expect(handler).toHaveBeenCalledTimes(3);
  });
});

describe("batch", () => {
  test("testBatch", () => {
    const obs = observable({ aa: 1, bb: "bbbb" });
    const handler = jest.fn();

    autorun(() => handler(obs.aa, obs.bb));
    expect(handler).toHaveBeenCalledTimes(1);

    batch(() => {
      obs.aa = 123;
      obs.bb = "dddd";
    });
    expect(handler).toHaveBeenCalledTimes(2);
  });

  // 纠正文档，batch.scope 将它理解为分批执行更容易理解
  test("testBatchScope", () => {
    const obs = observable<Partial<Record<string, number | string>>>({});
    const handler = jest.fn();

    autorun(() => handler(obs.aa, obs.bb, obs.cc, obs.dd));
    expect(handler).toHaveBeenCalledTimes(1);

    batch(() => {
      batch.scope!(() => (obs.aa = 123));
      batch.scope!(() => (obs.cc = "ccccc"));
      obs.bb = 321;
      obs.dd = "ddddd";
    });
    expect(handler).toHaveBeenCalledTimes(4);
  });
});

describe("action", () => {
  // 纠正文档，action 是不会收集依赖的 batch，除此之外 action 也缺少 endpoint
  test("testAction", () => {
    const obs = observable({ aa: 1, bb: 2 });
    const handler = jest.fn();

    autorun(() => handler(obs.aa, obs.bb));
    expect(handler).toHaveBeenCalledTimes(1);

    action(() => {
      obs.aa = 123;
      obs.bb = 321;
    });
    expect(handler).toHaveBeenCalledTimes(2);
  });
});

describe("define", () => {
  // 文档修正，define 是作为手动绑定方法
  // 可以绑定 class 也可以绑定一个对象，作为 observable 对象
  test("testDefine", () => {
    class DomainModel {
      box = observable.box(0);
      deep = { aa: 1 };
      shallow = {};
      ref = "";

      constructor() {
        define(this, {
          // 解决 eslint 检查 TS 类型问题
          // box: observable.box
          computed: observable.computed,
          deep: observable,
          shallow: observable.shallow,
          ref: observable.ref,
          action,
        });
      }
      get computed() {
        return this.deep.aa + this.box.get();
      }
      action(aa: number, box: number) {
        this.deep.aa = aa;
        this.box.set(box);
      }
    }

    const model = new DomainModel();
    const handler = jest.fn();

    autorun(() => handler(model.computed));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenLastCalledWith(1);

    // 重复修改值，只响应 1 次
    model.action(1, 2);
    model.action(1, 2);
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenLastCalledWith(3);

    model.action(3, 4);
    expect(handler).toHaveBeenCalledTimes(3);
    expect(handler).toHaveBeenLastCalledWith(7);
  });
});

describe("model", () => {
  // model 直接返回一个 observable 对象
  // 其中 getting/setting 都是 compute，其他方法都是 action
  test("testModel", () => {
    const handler = jest.fn();
    const obs = model({
      aa: 1,
      bb: 2,
      get cc() {
        return this.aa + this.bb;
      },
      update(aa: number, bb: number) {
        this.aa = aa;
        this.bb = bb;
      },
    });

    autorun(() => handler(obs.cc));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(obs.cc).toBe(3);

    obs.aa = 3;
    expect(handler).toHaveBeenCalledTimes(2);
    expect(obs.cc).toBe(5);

    obs.update(4, 6);
    expect(handler).toHaveBeenCalledTimes(3);
    expect(obs.cc).toBe(10);
  });
});
