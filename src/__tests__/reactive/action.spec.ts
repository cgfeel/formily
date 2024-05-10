import { action, autorun, observable } from "@formily/reactive";

describe("normal action", () => {
    // 没有批量动作
    test("no action", () => {
        const obs = observable({ aa: { bb: 123 } });
        const handler = jest.fn();

        expect(handler).toHaveBeenCalledTimes(0);

        // 接收一个 tracker 函数，如果函数内部有消费 observable 数据，数据发生变化时，tracker 函数会重复执行
        // 初始化会调用 1 次
        autorun(() => {
            handler(obs.aa.bb);
        });
        expect(handler).toHaveBeenCalledTimes(1);

        // 之后没修改一次值，更新一次
        obs.aa.bb = 111;
        obs.aa.bb = 222;
        expect(handler).toHaveBeenCalledTimes(3);

        obs.aa.bb = 333;
        obs.aa.bb = 444;
        expect(handler).toHaveBeenCalledTimes(5);
    });

    // 批量动作
    test("action", () => {
        const obs = observable({ aa: { bb: 123 } });

        const handler = jest.fn();
        expect(handler).toHaveBeenCalledTimes(0);

        autorun(() => {
            handler(obs.aa.bb);
        });
        expect(handler).toHaveBeenCalledTimes(1);

        obs.aa.bb = 111;
        obs.aa.bb = 222;
        expect(handler).toHaveBeenCalledTimes(3);

        // 定义一个批量动作，回调函数中所有的操作只计算 1 次
        action(() => {
            obs.aa.bb = 333;
            obs.aa.bb = 444;
        });
        expect(handler).toHaveBeenCalledTimes(4);
    });

    // 在跟踪函数中设置批量动作，批量动作不会被跟踪
    test("action track", () => {
        const handler = jest.fn();
        const obs = observable({
            aa: { bb: 123 },
            cc: 1,
        });

        autorun(() => {
            // 批量动作不会被跟踪
            action(() => {
                handler(obs.aa.bb);
                obs.cc = obs.cc + 20;
            });
        });

        // 初始化调用 1 次
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);

        // 更新值后没有变化
        obs.aa.bb = 321;
        expect(handler).toHaveBeenCalledTimes(1);
        expect(obs.cc).toBe(21);
    });
});