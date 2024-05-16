import { observable, observe } from "@formily/reactive";

// observe 深响应
test("deep observe", () => {
    const handler = jest.fn();
    const obs = observable<any>({
        aa: {
            bb: {
                cc: [11, 22, 33]
            }
        },
        ee: observable([]),
    });

    observe(obs, handler);
    expect(handler).toHaveBeenCalledTimes(0);

    obs.dd = 123;
    expect(handler).toHaveBeenCalledTimes(1);

    obs.aa.bb.cc.push(44);
    expect(handler).toHaveBeenCalledTimes(2);

    delete obs.aa;
    expect(handler).toHaveBeenCalledTimes(3);

    // Are these expected behaviors?
    // obs.ee 是一个新的劫持对象，所有的操作不会触发上一级响应
    obs.ee.push(11);
    expect(handler).toHaveBeenCalledTimes(3);

    obs.ee.push(22);
    expect(handler).toHaveBeenCalledTimes(3);

    obs.ee.pop();
    expect(handler).toHaveBeenCalledTimes(3);

    // 当我将 obs.ee 修改为一个普通的数组的时候，obs 开始响应
    obs.ee = [];
    expect(handler).toHaveBeenCalledTimes(4);
    
    obs.ee.push(11);
    expect(handler).toHaveBeenCalledTimes(5);
});

// observe 浅响应 - 第三个参数设置 `false`
test("shallow observe", () => {
    const handler = jest.fn();
    const obs = observable<any>({
        aa: {
            bb: {
                cc: [11, 22, 33]
            }
        }
    });

    observe(obs, handler, false);
    expect(handler).toHaveBeenCalledTimes(0);

    obs.dd = 123;
    expect(handler).toHaveBeenCalledTimes(1);

    obs.aa.bb.cc.push(44);
    expect(obs.aa.bb.cc).toEqual([11, 22, 33, 44]);
    expect(handler).toHaveBeenCalledTimes(1);

    delete obs.aa;
    expect(handler).toHaveBeenCalledTimes(2);
});

// observe 响应根节点替换
test("root replace observe", () => {
    const aa = {
        bb: {
            cc: [11, 12, 13]
        }
    };

    const obs = observable<any>({ aa });
    const handler = jest.fn();
    const handler1 = jest.fn();

    observe(obs, handler1);
    observe(obs.aa, handler);

    obs.aa = { mm: 123 };
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler1).toHaveBeenCalledTimes(1);

    obs.aa = aa;
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler1).toHaveBeenCalledTimes(2);

    obs.aa.bb.cc.push(44);
    expect(handler).toHaveBeenCalledTimes(3);
    expect(handler1).toHaveBeenCalledTimes(3);
});

// observe 通过 `dispose` 停止响应 - 1
test("dispose observe", () => {
    const obs = observable<any>({
        aa: {
            bb: {
                cc: [11, 22, 33]
            }
        }
    });

    const handler = jest.fn();
    const dispose = observe(obs, handler);
    expect(handler).toHaveBeenCalledTimes(0);

    obs.kk = 123;
    expect(handler).toHaveBeenCalledTimes(1);

    dispose();
    obs.aa = 123;

    expect(handler).toHaveBeenCalledTimes(1);
});

// observe 通过 `dispose` 停止响应 - 2
test("dispose observe", () => {
    const obs = observable<any>({
        aa: {
            bb: {
                cc: [11, 22, 33]
            }
        }
    });

    const handler = jest.fn();
    const dispose = observe(obs.aa, handler);
    expect(handler).toHaveBeenCalledTimes(0);

    // 监控的是 aa，这里修改的是 kk
    obs.kk = 111;
    expect(handler).toHaveBeenCalledTimes(0);

    obs.aa = { mm: 222 };
    expect(handler).toHaveBeenCalledTimes(1);

    // 修改的值是一个对象，看上去没变化，实际引用地址已经发生改变了
    obs.aa = { mm: 222 };
    expect(handler).toHaveBeenCalledTimes(2);

    obs.aa = { mm: 111 };
    expect(handler).toHaveBeenCalledTimes(3);

    obs.aa = { mm: 333 };
    expect(handler).toHaveBeenCalledTimes(4);
    
    // 停止响应后再修改
    dispose();
    obs.aa = { mm: 444 };
    expect(handler).toHaveBeenCalledTimes(4);
});

// observe 中 track 函数的使用给定的参数进行条件判断
test("array delete", () => {
    const array = observable([{ value: 1 }, { value: 2 }]);
    const fn = jest.fn();

    const dispose = observe(array, ({ key, path, type }) => {
        // 如果是更新值，更新的键名是 value，就将 path 传递过去
        if (type === 'set' && key === "value") {
            fn(path?.join("."));
        }
    });

    array[0].value = 3;
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith("0.value");

    // 删除数组项目没有变化
    array.splice(0, 1);
    expect(fn).toHaveBeenCalledTimes(1);

    array[0].value = 3;
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith("0.value");
    dispose();
});

// observable 对象树中动态添加的 observable 节点，会响应深度修改
// observable 对象树中静态存在的 observable 节点，只响应浅度修改
test("observe dynamic tree", () => {
    const tree = observable<Record<string, number[]>>({ input: observable([]) });
    const childTree = observable<number[]>([]);

    const handler = jest.fn();
    observe(tree, handler);

    // 操作已定义为 observable 的子对象不响应
    tree.input.push(22);
    expect(handler).toHaveBeenCalledTimes(0);

    // 但动态添加的 observable 对象的操作会触发响应
    tree.children = childTree;
    expect(handler).toHaveBeenCalledTimes(1);

    tree.children.push(123);
    childTree.push(321);
    expect(handler).toHaveBeenCalledTimes(3);

    // 除了数组，对象也一样，只要是动态添加就会触发响应
    const tree1 = observable<Record<string, { aa?: number }>>({ input: observable({}) });
    const childTree1 = observable<{ aa?: number }>({});

    const handler1 = jest.fn();
    observe(tree1, handler1);

    // 操作已定义为 observable 的子对象不响应
    tree1.input.aa = 123;
    expect(handler1).toHaveBeenCalledTimes(0);

    // 但动态添加的 observable 对象的操作会触发响应
    tree1.children = childTree1;
    expect(handler1).toHaveBeenCalledTimes(1);

    tree1.children.aa = 123;
    childTree1.aa = 321;
    expect(handler1).toHaveBeenCalledTimes(3);
});

// observer 响应对象传递为函数将会抛错
test("invalid target", () => {
    expect(() => observe(function() {})).toThrow();
});