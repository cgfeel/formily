import { autorun, batch, define, observable, reaction } from "@formily/reactive";
import { sleep } from "../shared";

// 创建一个 autorun
// 接收一个 tracker 函数，如果函数内部有消费 observable 数据，数据发生变化时，tracker 函数会重复执行
test("autorun", () => {
    const obs = observable({ aa: { bb: 123 } });
    const handler = jest.fn();

    const dispose = autorun(() => handler(obs.aa.bb));
    expect(handler).toHaveBeenCalledTimes(1);

    // 赋值一个没有改变的值，不会触发响应
    obs.aa.bb = 123;
    expect(handler).toHaveBeenCalledTimes(1);

    // 修改值
    obs.aa.bb = 111;
    expect(handler).toHaveBeenCalledTimes(2);

    // 停止响应后修改值
    dispose();
    obs.aa.bb = 222;
    expect(handler).toHaveBeenCalledTimes(2);
});

// 创建一个 reaction，监听 subscrible 订阅
// 接收一个 tracker 函数，与 callback 响应函数
// 如果 tracker 内部有消费 observable 数据，数据发生变化时，tracker 函数会重复执行，
// 但是 callback 执行必须要求 tracker 函数返回值发生变化时才执行
test("reaction", () => {
    const obs = observable({ aa: { bb: 123 } });

    // 这里 handler 将作为 subscribe，初始化后不会立即执行，只有更新依赖后才响应
    const handler = jest.fn();
    const dispose = reaction(
        () => obs.aa.bb,
        handler
    );
    
    obs.aa.bb = 123;
    expect(handler).toHaveBeenCalledTimes(0);

    // 修改值
    obs.aa.bb = 111;
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(111, 123);

    // 停止响应
    dispose();
    obs.aa.bb = 222;
    expect(handler).toHaveBeenCalledTimes(1);
});

// reaction 初始化后立即响应
test("reaction fireImmediately", () => {
    const obs = observable({ aa: { bb: 123 } });
    const handler = jest.fn();

    const dispose = reaction(
        () => obs.aa.bb,
        handler,
        {
            fireImmediately: true,
        }
    );
    
    // 初始化立即响应
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(123, 123);

    // 赋值没有变化
    obs.aa.bb = 123;
    expect(handler).toHaveBeenCalledTimes(1);

    // 修改值
    obs.aa.bb = 111;
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledWith(111, 123);

    // 停止响应再修改值
    dispose();
    obs.aa.bb = 222;
    expect(handler).toHaveBeenCalledTimes(2);
});

// reaction 中 subscribe 不收集依赖
test("reaction untrack handler", () => {
    const obs = observable({ aa: { bb: 123, cc: 123 } });
    const handler = jest.fn();

    const dispose = reaction(
        () => obs.aa.bb,
        () => {
            // 在 subscribe 中只响应 track 函数中的依赖，不会在自身内部收集依赖
            handler(obs.aa.cc);
        }
    );
    expect(handler).toHaveBeenCalledTimes(0);

    obs.aa.bb = 222;
    expect(handler).toHaveBeenCalledTimes(1);

    obs.aa.cc = 222;
    expect(handler).toHaveBeenCalledTimes(1);
    dispose();
});

// reaction 中进行数据的脏检查
test("reaction dirty check", () => {
    // 通过 define 劫持 obs.aa 为一个响应引用
    const obs = { aa: 123 };
    define(obs, { aa: observable.ref });

    const handler = jest.fn();
    reaction(() => obs.aa, handler);

    // 实现一个会收集依赖的批量操作，但是没有更新数据
    batch(() => {
        obs.aa = 123;
        obs.aa = 123;
    });

    // 即便不在批量操作里赋值一个没有更新的数据，也不会触发响应
    obs.aa = 123;
    obs.aa = 123;
    expect(handler).toHaveBeenCalledTimes(0);

    // 在批量操作里更新数据会计入一次
    batch(() => {
        obs.aa = 321;
        obs.aa = 333;
    });
    expect(handler).toHaveBeenCalledTimes(1);
});

// reaction 响应中浅比较 - 默认
test("reaction with shallow equals", () => {
    const obs = {
        aa: { bb: 123 }
    };

    define(obs, { aa: observable.ref });
    const handler = jest.fn();

    reaction(
        () => obs.aa,
        handler,
    );

    // 脏检查默认是浅比较对象
    obs.aa = { bb: 123 };
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0]).toMatchObject({ bb: 123 });
    expect(handler.mock.calls[0][1]).toMatchObject({ bb: 123 });

    // reaction 中只能浅响应依赖
    obs.aa.bb = 321;
    expect(handler).toHaveBeenCalledTimes(1);
});

// reaction 中深比较 - 通过自定义 equals 进行脏检查
test("reaction with deep equals", () => {
    const obs = {
        aa: { bb: 123 }
    };

    define(obs, { aa: observable.ref });
    const handler = jest.fn();

    reaction(
        () => obs.aa,
        handler,
        {
            equals: (oldValue, newValue) => JSON.stringify(oldValue) === JSON.stringify(newValue),
        }
    );

    obs.aa = { bb: 123 };
    expect(handler).toHaveBeenCalledTimes(0);

    // reaction 中只能浅响应依赖
    obs.aa.bb = 321;
    expect(handler).toHaveBeenCalledTimes(0);
});

// 在 autorun 中递增 observable 对象
test("autorun direct recursive react", () => {
    const obs = observable({ value: 1 });
    autorun(() => {
        obs.value++;
    });

    // autorun 初始化为 1，自身 ++ 为 2
    expect(obs.value).toEqual(2);

    obs.value = 3;
    expect(obs.value).toEqual(4);
});

// autorun 初始化收集的依赖决定后续响应情况
test("autorun direct recursive react with if", () => {
    const obs1 = observable<Partial<Record<string, string>>>({});
    const obs2 = observable<Partial<Record<string, string>>>({});
    const fn = jest.fn();

    autorun(() => {
        // 初始化时 obs1.value 是 undefined，这里只收集了 obs1 的依赖
        if (!obs1.value) {
            obs1.value = "111";
            return;
        }
        fn(obs1.value, obs2.value);
    });

    // 初始化没有调用 fn
    expect(fn).toHaveBeenCalledTimes(0);

    // 初始化跳过依赖，在后续更新也不会继续响应
    obs2.value = "222";
    expect(fn).toHaveBeenCalledTimes(0);
});

// autorun 中间接递归响应 - 单向递归
test("autorun indirect recursive react", () => {
    const obs1 = observable<Partial<Record<string, number>>>({});
    const obs2 = observable<Partial<Record<string, number>>>({});
    const obs3 = observable<Partial<Record<string, number>>>({});

    autorun(() => {
        // @ts-ignore
        obs1.value = obs2.value + 1;
    });

    // undefined + 1;
    expect(obs1.value).toEqual(NaN);

    autorun(() => {
        // @ts-ignore
        obs2.value = obs3.value + 1;
    });

    // NaN + 1
    expect(obs1.value).toEqual(NaN);

    // undefined + 1
    expect(obs2.value).toEqual(NaN);

    autorun(() => {
        // 由于初始化时 obs1.value 并没有值，跳过 if 块收集 else 块
        if (obs1.value) {
            obs3.value = obs1.value + 1;
        } else {
            obs3.value = 0;
        }
    });

    // 每次执行根据上线问的顺序，由下到上单向执行，不会来回调用
    // 响应 o3 时发现 o1 是 undefined 得到 0
    // 响应 o2 拿到 o3 是 0，得到 1
    // 响应 o1 拿到 o2 是 1，得到 2
    expect(obs3.value).toEqual(0);
    expect(obs2.value).toEqual(1);
    expect(obs1.value).toEqual(2);

    // 每次执行根据上线问的顺序，由下到上单向执行，不会来回调用
    // 修改 o3 为 1 先触发响应 o2，得到 2
    // 响应 o1 拿到 o2 是 3，得到 3
    // 响应 o3 拿到 o1 是 4，得到 4
    obs3.value = 1;
    expect(obs2.value).toEqual(2);
    expect(obs1.value).toEqual(3);
    expect(obs3.value).toEqual(4);

    // 每次执行根据上线问的顺序，由下到上单向执行，不会来回调用
    // 修改 o1 为 1 先触发响应 o3，得到 2
    // 响应 o2 拿到 o3 是 2，得到 3
    // 响应 o1 拿到 o2 是 3，得到 4
    obs1.value = 1;
    expect(obs3.value).toEqual(2);
    expect(obs2.value).toEqual(3);
    expect(obs1.value).toEqual(4);
});

// autorun 中间接递归响应 - 批量操作递归
test("autorun indirect alive recursive react", () => {
    const aa = observable<Partial<Record<string, number>>>({});
    const bb = observable<Partial<Record<string, number>>>({});
    const cc = observable<Partial<Record<string, number>>>({});

    // 批量操作递归会根据拿到的值，从上到下重新计算
    batch(() => {
        autorun(() => {
            // 第一次 undefined，拿不到值
            // 第二次由于 aa.value = 1，所以 bb.value = 2
            if (aa.value) {
                bb.value = aa.value + 1;
            }
        });
        autorun(() => {
            // 第一次是 undefined，拿不到值
            // 第二次由于 aa.value = 1，bb.value = 2，所以 cc.value = 3
            if (aa.value && bb.value) {
                cc.value = aa.value + bb.value;
            }
        });
        // 这里不用 batch 直接赋值也是一样的，批量操作中嵌套批量操作和直接操作相同
        batch(() => {
            aa.value = 1;
        });
    });
    expect(aa.value).toEqual(1);
    expect(bb.value).toEqual(2);
    expect(cc.value).toEqual(3);
});

// autorun 跳出响应前，通过头部赋值收集依赖
test("autorun direct recursive react with head track", () => {
    const obs1 = observable<Partial<Record<string, string>>>({});
    const obs2 = observable<Partial<Record<string, string>>>({});
    const fn = jest.fn();

    autorun(() => {
        const obs2Value = obs2.value;
        if (!obs1.value) {
            obs1.value = "111";
            return;
        }
        fn(obs1.value, obs2Value);
    });

    // 初始化的时候由于 obs1.value 是 undefined，所以不会触发调用
    // 但是跳出前已经为 obs1 赋值了
    expect(fn).toHaveBeenCalledTimes(0);
    expect(obs1.value).toEqual("111");

    // 但是在跳出前，obs2Value 收集了 obs2.value 依赖，更新时也会继续响应
    obs2.value = "222";
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("111", "222");
});

// autorun.memo
// 在 autorun 中用于创建持久引用数据，仅仅只会受依赖变化而重新执行 memo 内部函数
// 注意：请不要在 If/For 这类语句中使用，因为它内部是依赖执行顺序来绑定当前 autorun 的
test("autorun.memo", () => {
    const obs = observable({ bb: 0 });
    const fn = jest.fn();

    autorun(() => {
        const value = autorun.memo(() => ({ aa: 0 }));
        fn(obs.bb, value.aa++);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(0, 0);

    obs.bb++;
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledWith(1, 1);

    obs.bb++;
    expect(fn).toHaveBeenCalledTimes(3);
    expect(fn).toHaveBeenCalledWith(2, 2);

    obs.bb++;
    expect(fn).toHaveBeenCalledTimes(4);
    expect(fn).toHaveBeenCalledWith(3, 3);

    obs.bb++;
    expect(fn).toHaveBeenCalledTimes(5);
    expect(fn).toHaveBeenCalledWith(4, 4);
});

// 使用 observable 对象创建一个 autorun.memo
// 使用 observable 在 autorun 中创建持久引用数据 -  和普通对象表现一致
test("autorun.memo with observable", () => {
    const obs1 = observable({ aa: 0 });
    const fn = jest.fn();

    const dispost = autorun(() => {
        const obs2 = autorun.memo(() => observable({ bb: 0 }));
        fn(obs1.aa, obs2.bb++);
    });

    obs1.aa++;
    obs1.aa++;
    obs1.aa++;

    // 初始 1 次，递增 3 次
    expect(fn).toHaveBeenCalledTimes(4);
    expect(fn).toHaveBeenNthCalledWith(1, 0, 0);
    expect(fn).toHaveBeenNthCalledWith(2, 1, 1);
    expect(fn).toHaveBeenNthCalledWith(3, 2, 2);
    expect(fn).toHaveBeenNthCalledWith(4, 3, 3);

    // 停止响应
    dispost();
    obs1.aa++

    expect(fn).toHaveBeenCalledTimes(4);
});

// autorun.effect 在 autorun 添加一个微任务，在响应结束前执行
// 在 autorun 中用于响应 autorun 第一次执行的下一个微任务时机与响应 autorun 的 dispose
// 注意：请不要在 If/For 这类语句中使用，因为它内部是依赖执行顺序来绑定当前 autorun 的
test("autorun.memo with observable and effect", async () => {
    const obs1 = observable({ aa: 0 });
    const fn = jest.fn();

    const dispose = autorun(() => {
        const obs2 = autorun.memo(() => observable({ bb: 0 }));

        fn(obs1.aa, obs2.bb++);
        autorun.effect(() => {
            obs2.bb++;
        }, []);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenNthCalledWith(1, 0, 0);

    obs1.aa++
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenNthCalledWith(2, 1, 1);

    obs1.aa++
    expect(fn).toHaveBeenCalledTimes(3);
    expect(fn).toHaveBeenNthCalledWith(3, 2, 2);

    obs1.aa++
    expect(fn).toHaveBeenCalledTimes(4);
    expect(fn).toHaveBeenNthCalledWith(4, 3, 3);

    // fn 中递增一次，effect 中递增 1 次，作为微任务最后执行
    await sleep(0);
    expect(fn).toHaveBeenCalledTimes(5);
    expect(fn).toHaveBeenNthCalledWith(5, 3, 5);
    dispose();
});

// autorun.memo 中添加依赖
test("autorun.memo with deps", () => {
    const obs = observable({ bb: 0, cc: 0 });
    const fn = jest.fn();

    autorun(() => {
        const value = autorun.memo(() => ({ aa: 0 }), [obs.cc]);
        fn(obs.bb, value.aa++);
    });

    obs.bb++;
    obs.bb++;
    obs.bb++;
    obs.bb++;

    // 初始化 1 次，递增 4 次
    expect(fn).toHaveBeenCalledTimes(5);
    expect(fn).toHaveBeenNthCalledWith(1, 0, 0);
    expect(fn).toHaveBeenNthCalledWith(2, 1, 1);
    expect(fn).toHaveBeenNthCalledWith(3, 2, 2);
    expect(fn).toHaveBeenNthCalledWith(4, 3, 3);
    expect(fn).toHaveBeenNthCalledWith(5, 4, 4);

    // 修改 cc 值后，value 重新初始化
    obs.cc++;
    expect(fn).toHaveBeenCalledTimes(6);
    expect(fn).toHaveBeenNthCalledWith(6, 4, 0);
});

// autorun.memo 响应依赖更新以及 autorun 停止响应
test("autorun.memo with deps and dispose", () => {
    const obs = observable({ bb: 0, cc: 0 });
    const fn = jest.fn();

    const dispose = autorun(() => {
        const value = autorun.memo(() => ({ aa: 0 }), [obs.cc]);
        fn(obs.bb, value.aa++);
    });

    obs.bb++;
    obs.bb++;
    obs.bb++;
    obs.bb++;

    // 初始值 1，自增 +4
    expect(fn).toHaveBeenCalledTimes(5);
    expect(fn).toHaveBeenNthCalledWith(1, 0, 0);
    expect(fn).toHaveBeenNthCalledWith(2, 1, 1);
    expect(fn).toHaveBeenNthCalledWith(3, 2, 2);
    expect(fn).toHaveBeenNthCalledWith(4, 3, 3);
    expect(fn).toHaveBeenNthCalledWith(5, 4, 4);

    // 更新 cc 会导致 value 还原
    obs.cc++;
    expect(fn).toHaveBeenCalledTimes(6);
    expect(fn).toHaveBeenNthCalledWith(6, 4, 0);

    // 停止更新不再响应
    dispose();
    obs.bb++;
    obs.cc++;
    expect(fn).toHaveBeenCalledTimes(6);
});

// autorun.memo 容错，传递无效值
test("autorun.memo with invalid params", () => {
    const obs = observable({ bb: 0 });
    const fn = jest.fn();

    autorun(() => {
        // @ts-ignore autorun.memo 只接受一个返还对象的函数，这里直接传递一个对象
        const value = autorun.memo({ aa: 0 });
        fn(obs.bb, value);
    });

    obs.bb++;
    obs.bb++;
    obs.bb++;
    obs.bb++;

    // 初始 1 次，自增 4 次，由于 autorun.memo 传入的是无效参数，得到的也是 undefined
    expect(fn).toHaveBeenCalledTimes(5);
    expect(fn).toHaveBeenCalledWith(4, undefined);
});

// 在 autorun 外部使用 autorun.memo 会抛出错误
test("autorun.memo not in autorun", () => {
    expect(() => autorun.memo(() => ({ aa: 0 }))).toThrow();
});

// 在 autorun 中不使用 autorun.memo 无效递增
test("autorun no memo", () => {
    const obs = observable({ bb: 0 });
    const fn = jest.fn();

    // 普通的对象不会记录每次自增的结果
    autorun(() => {
        const value = { aa: 0 };
        fn(obs.bb, value.aa++);
    });

    obs.bb++;
    obs.bb++;
    obs.bb++;
    obs.bb++;

    expect(fn).toHaveBeenCalledTimes(5);
    expect(fn).toHaveBeenNthCalledWith(1, 0, 0);
    expect(fn).toHaveBeenNthCalledWith(2, 1, 0);
    expect(fn).toHaveBeenNthCalledWith(3, 2, 0);
    expect(fn).toHaveBeenNthCalledWith(4, 3, 0);
    expect(fn).toHaveBeenNthCalledWith(5, 4, 0);
});

// autorun.effect 微任务的执行和结束回调
test("autorun.effect", async () => {
    const obs = observable({ bb: 0 });
    const fn = jest.fn();
    const effect = jest.fn();
    const disposer = jest.fn();

    const dispose = autorun(() => {
        autorun.effect(() => {
            effect();
            return disposer;
        }, []);
        fn(obs.bb);
    });

    obs.bb++;
    obs.bb++;
    obs.bb++;
    obs.bb++;

    expect(fn).toHaveBeenCalledTimes(5);
    expect(fn).toHaveBeenCalledWith(4);

    // 微任务不会立即执行
    expect(effect).toHaveBeenCalledTimes(0);

    // 等待执行下一个微任务
    await sleep(0);
    expect(effect).toHaveBeenCalledTimes(1);
    expect(disposer).toHaveBeenCalledTimes(0);

    // disposer 只有在结束时才会调用返回函数
    dispose();
    expect(effect).toHaveBeenCalledTimes(1);
    expect(disposer).toHaveBeenCalledTimes(1);
});

// autorun.effect 结束前 autorun 已 dispose
test("autorun.effect dispose when autorun dispose", async () => {
    const obs = observable({ bb: 0 });
    const fn = jest.fn();
    const effect = jest.fn();
    const disposer = jest.fn();

    const dispose = autorun(() => {
        autorun.effect(() => {
            effect();
            return disposer;
        }, []);
        fn(obs.bb);
    });

    obs.bb++;
    obs.bb++;
    obs.bb++;
    obs.bb++;

    // 递增之后立即停止响应
    dispose();
    await sleep(0);

    // 初始化 1 次，自增 5 次
    expect(fn).toHaveBeenCalledTimes(5);
    expect(fn).toHaveBeenCalledWith(4);

    // 由于在执行下一个微任务前停止了，微任务和返回回调函数也不会执行
    expect(effect).toHaveBeenCalledTimes(0);
    expect(disposer).toHaveBeenCalledTimes(0);
});

// autorun.effect 添加依赖
test("autorun.effect with deps", async () => {
    const obs = observable({ bb: 0, cc: 0 });
    const fn = jest.fn();
    const effect = jest.fn();

    const dispose = autorun(() => {
        autorun.effect(() => effect(), [obs.cc]);
        fn(obs.bb);
    });

    obs.bb++;
    obs.bb++;
    obs.bb++;
    obs.bb++;

    // 初始化 1 次，自增 4 次，微任务不执行
    expect(fn).toHaveBeenCalledTimes(5);
    expect(fn).toHaveBeenLastCalledWith(4);
    expect(effect).toHaveBeenCalledTimes(0);

    await sleep(0);
    expect(effect).toHaveBeenCalledTimes(1);

    // 更新依赖，将添加一个微任务等待执行
    obs.cc++;
    expect(effect).toHaveBeenCalledTimes(1);

    // 同时会再执行一遍 autorun
    expect(fn).toHaveBeenCalledTimes(6);
    expect(fn).toHaveBeenLastCalledWith(4);

    await sleep(0);
    expect(effect).toHaveBeenCalledTimes(2);

    // 停止响应
    dispose();
    obs.bb++;

    await sleep(0);
    expect(fn).toHaveBeenCalledTimes(6);
    expect(fn).toHaveBeenLastCalledWith(4);
    expect(effect).toHaveBeenCalledTimes(2);
});

// autorun.effect 不添加依赖默认为 [{}]，随 autorun 每次都响应
test("autorun.effect with default deps", async () => {
    const obs = observable({ bb: 0 });
    const fn = jest.fn();
    const effect = jest.fn();

    const dispose = autorun(() => {
        // 没有依赖的情况下，默认会随每次响应，自动添加一个微任务
        autorun.effect(() => effect());
        fn(obs.bb);
    });

    obs.bb++;
    obs.bb++;
    obs.bb++;
    obs.bb++;

    // 初始化 1 次，递增 4 次，微任务等待执行
    expect(fn).toHaveBeenCalledTimes(5);
    expect(fn).toHaveBeenCalledWith(4);
    expect(effect).toHaveBeenCalledTimes(0);

    await sleep(0);
    expect(fn).toHaveBeenCalledTimes(5);
    expect(effect).toHaveBeenCalledTimes(5);

    // 停止响应后再更新数据
    dispose();
    obs.bb++;

    await sleep(0);
    expect(fn).toHaveBeenCalledTimes(5);
    expect(effect).toHaveBeenCalledTimes(5);
});

// autorun.effect 在 autorun 外部使用将抛出错误
test("autorun.effect not in autorun", () => {
    expect(() => autorun.effect(() => {})).toThrow();
});

// autorun.effect 容错
test("autorun.effct with invalid params", () => {
    // autorun.effect 只接受一个函数，传入无效的参数不会正常执行，本应抛出错误也不会出现
    // @ts-ignore 
    autorun.effect({});
});

// 在 batch 内部停止 autorun 响应
test("autorun dispos in batch", () => {
    const obs = observable({ value: 123 });
    const handler = jest.fn();
    
    // 初始化会执行 1 次
    const dispos = autorun(() => handler(obs.value));
    expect(handler).toHaveBeenCalledTimes(1);

    // 在批量操作过程中停止响应，不会继续调用
    batch(() => {
        obs.value = 321;
        dispos();
    });
    expect(handler).toHaveBeenCalledTimes(1);
});

// autorun 依赖 observable.computed 计算的值
test("set value by computed depend", () => {
    const obs = observable<any>({});
    const comp1 = observable.computed(() => obs.aa?.bb);
    const comp2 = observable.computed(() => obs.aa?.cc);

    const handler = jest.fn();
    autorun(() => handler(comp1.value, comp2.value));

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(undefined, undefined);

    obs.aa = { bb: 123, cc: 321 };
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenNthCalledWith(2, 123, 321);
});

// autorun 依赖 observable.computed 对象在 delete 后的响应
test("delete value by computed depend", () => {
    const obs = observable<any>({ a: { b: 1, c: 2 } });
    const comp1 = observable.computed(() => obs.a?.b);
    const comp2 = observable.computed(() => obs.a?.c);

    const handler = jest.fn();
    autorun(() => handler(comp1.value, comp2.value));

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(1, 2);

    delete obs.a;
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenNthCalledWith(2, undefined, undefined);
});

// autorun 依赖 observable.computed 使用 Set 类型对象
test("set Set value by computed depend", () => {
    const obs = observable({ set: new Set() });
    const comp1 = observable.computed(() => obs.set.has(1));
    const comp2 = observable.computed(() => obs.set.size);

    const handler = jest.fn();
    autorun(() => handler(comp1.value, comp2.value));

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(false, 0);

    obs.set.add(1);
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenNthCalledWith(2, true, 1);
});

// autorun 依赖 observable.computed 删除 Set 类型子集
test("delete Set by computed depend", () => {
    const obs = observable({ set: new Set([1]) });
    const comp1 = observable.computed(() => obs.set.has(1));
    const comp2 = observable.computed(() => obs.set.size);

    const handler = jest.fn();
    autorun(() => handler(comp1.value, comp2.value));

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(true, 1);

    obs.set.delete(1);
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledWith(false, 0);
});

// autorun 依赖 observable.computed 使用 Map 类型对象
test("set Map value by computed depend", () => {
    const obs = observable({ map: new Map() });
    const comp1 = observable.computed(() => obs.map.has(1));
    const comp2 = observable.computed(() => obs.map.size);

    const handler = jest.fn();
    autorun(() => handler(comp1.value, comp2.value));

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(false, 0);

    obs.map.set(1, 1);
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledWith(true, 1);
});

// autorun 依赖 observable.computed 删除 Map 类型子集
test("delete Map by computed depend", () => {
    const obs = observable({ map: new Map([[1, 1]]) });
    const comp1 = observable.computed(() => obs.map.has(1));
    const comp2 = observable.computed(() => obs.map.size);

    const handler = jest.fn();
    autorun(() => handler(comp1.value, comp2.value));

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(true, 1);

    obs.map.delete(1);
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenNthCalledWith(2, false, 0);
});

// autorun 中有条件的依赖收集
test("autorun recollect dependencies", () => {
    const obs = observable({ aa: "aaa", bb: "bbb", cc: "ccc" });
    const fn = jest.fn();

    autorun(() => {
        fn();
        return obs.aa === "aaa" ? obs.bb : obs.cc;
    });
    expect(fn).toHaveBeenCalledTimes(1);

    // 修改 aa，不再响应 bb
    obs.aa = "111";
    expect(fn).toHaveBeenCalledTimes(2);

    obs.bb = "222";
    expect(fn).toHaveBeenCalledTimes(2);
});

// reaction 中有条件的依赖收集、subscrible、fireImmediately
test("reaction recollect dependencies", () => {
    const obs = observable({ aa: "aaa", bb: "bbb", cc: "ccc" });
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const tirgger1 = jest.fn();
    const tirgger2 = jest.fn();

    reaction(
        () => {
            fn1();
            return obs.aa === "aaa" ? obs.bb : obs.cc;
        },
        tirgger1
    );
    
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(tirgger1).toHaveBeenCalledTimes(0);

    reaction(
        () => {
            fn2();
            return obs.aa === "aaa" ? obs.bb : obs.cc;
        },
        tirgger2,
        {
            fireImmediately: true
        }
    );
    
    // 只有 fireImmediately: true 才会初始化立即执行 subscribe
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(tirgger2).toHaveBeenCalledTimes(1);

    // 修改 aa 不在 响应 bb
    obs.aa = "111";
    expect(fn1).toHaveBeenCalledTimes(2);
    expect(fn2).toHaveBeenCalledTimes(2);
    expect(tirgger1).toHaveBeenCalledTimes(1);
    expect(tirgger2).toHaveBeenCalledTimes(2);

    // 不再响应 bb
    obs.bb = "222";
    expect(fn1).toHaveBeenCalledTimes(2);
    expect(fn2).toHaveBeenCalledTimes(2);
    expect(tirgger1).toHaveBeenCalledTimes(1);
    expect(tirgger2).toHaveBeenCalledTimes(2);
});