import { autorun, batch, observable } from "@formily/reactive";

describe("normal batch", () => {
    // 不使用批量操作，每次修改劫持对象都会响应一次
    test("no batch", () => {
        const obs = observable({ aa: { bb: 123 } });
        const handler = jest.fn();

        autorun(() => handler(obs.aa.bb));
        expect(handler).toHaveBeenCalledTimes(1);

        obs.aa.bb = 111;
        obs.aa.bb = 222;
        expect(handler).toHaveBeenCalledTimes(3);

        obs.aa.bb = 333;
        obs.aa.bb = 444;
        expect(handler).toHaveBeenCalledTimes(5);
    });

    // 使用批量操作，内部所有修改只记录一次响应
    test("batch", () => {
        const obs = observable({ aa: { bb: 123 } });
        const handler = jest.fn();

        autorun(() => handler(obs.aa.bb));
        expect(handler).toHaveBeenCalledTimes(1);

        obs.aa.bb = 111;
        obs.aa.bb = 222;
        expect(handler).toHaveBeenCalledTimes(3);
        expect(handler).toHaveBeenLastCalledWith(222);

        batch(() => {
            obs.aa.bb = 333;
            obs.aa.bb = 444;
        });
        expect(handler).toHaveBeenCalledTimes(4);
        expect(handler).toHaveBeenLastCalledWith(444);
    });

    // 在 track 函数中使用 batch
    test("batch track", () => {
        const obs = observable({ 
            aa: { bb: { cc: 123 } }, 
            cc: 1,
        });

        // 这里会和 action 不同，batch 会收集依赖，每次都响应依赖对象更新
        const handler = jest.fn();
        autorun(() => batch(() => {
            handler(obs.aa.bb);
            obs.cc += 20;
        }));

        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toEqual(21);

        // 更新数据会继续响应
        obs.aa.bb = { cc: 321 };
        expect(handler).toHaveBeenCalledTimes(2);
        expect(obs.cc).toEqual(41);
    });

    // action.bound 绑定一个批量操作
    test("batch.bound", () => {
        const obs = observable({ aa: { bb: 123 } });
        const setData = batch.bound!(() => {
            obs.aa.bb = 333;
            obs.aa.bb = 444;
        });
        
        const handler = jest.fn();
        autorun(() => handler(obs.aa.bb));

        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.aa.bb).toBe(123);

        obs.aa.bb = 111;
        obs.aa.bb = 222;
        expect(handler).toHaveBeenCalledTimes(3);
        expect(obs.aa.bb).toBe(222);

        // 批量操作增加 1 次
        setData();
        batch(() => {});
        expect(handler).toHaveBeenCalledTimes(4);
        expect(obs.aa.bb).toBe(444);
    });

    // 在 track 函数中使用 batch
    test("batch.bound track", () => {
        const obs = observable({ 
            aa: { bb: 123 }, 
            cc: 1
        });

        const handler = jest.fn();
        autorun(() => {
            const action = batch.bound!(() => {
                handler(obs.aa.bb);
                obs.cc += 20;
            });
            action();
        });

        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);

        obs.aa.bb = 321;
        expect(handler).toHaveBeenCalledTimes(2);
        expect(obs.cc).toBe(41);
    });

    // batch.scope 批量操作中分批执行
    test("batch.scope", () => {
        const obs = observable<Partial<Record<string, number|string>>>({});
        const handler = jest.fn();

        autorun(() => handler(obs.aa, obs.bb, obs.cc, obs.dd));
        batch(() => {
            batch.scope!(() => {
                obs.aa = 123;
            });
            batch.scope!(() => {
                obs.cc = "ccc";
            });
        });
    });
});