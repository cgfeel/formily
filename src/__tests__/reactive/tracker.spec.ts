import { Tracker, observable } from "@formily/reactive";

// Tracker 手动跟踪基础用法
test("base tracker", () => {
    const obs = observable<{ value?: number }>({});
    const fn = jest.fn();

    const view = () => fn(obs.value);
    const scheduler = () => tracker.track(view);

    const tracker = new Tracker(scheduler);
    tracker.track(view);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(undefined);

    // 在跟踪的 track 函数中收集了 obs.value 作为依赖，更新后会重新触发响应
    obs.value = 123;
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(123);

    // 停止跟踪
    tracker.dispose();
});

// Tracker 嵌套跟踪
test("nested tracker", () => {
    const obs = observable<{ value?: number }>({});
    const fn = jest.fn();

    const view = () => {
        obs.value = obs.value || 321;
        fn(obs.value);
    };

    const scheduler = () => tracker.track(view);
    const tracker = new Tracker(scheduler);

    expect(fn).toHaveBeenCalledTimes(0);

    tracker.track(view);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(321);

    obs.value = 123;
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(123);
    tracker.dispose();
});

test("tracker recollect dependencies", () => {
    const obs = observable({ aa: "aaa", bb: "bbb", cc: "ccc" });
    const fn = jest.fn();

    const view = () => {
        fn();
        return obs.aa === "aaa" ? obs.bb : obs.cc;
    };

    const scheduler = () => tracker.track(view);
    const tracker = new Tracker(scheduler);

    expect(tracker.track(view)).toEqual("bbb");
    expect(fn).toHaveBeenCalledTimes(1);

    obs.aa = "111";
    expect(fn).toHaveBeenCalledTimes(2);

    // 依赖变更后，不再响应 bb
    obs.bb = "222";
    expect(fn).toHaveBeenCalledTimes(2);
    tracker.track();
});

// 共享跟踪调度器
test("shared scheduler with multi tracker (mock react strict mode)", () => {
    const obs = observable<{ value?: number }>({});
    const component = () => obs.value;
    const render = () => {
        tracker1.track(component);
        tracker2.track(component);
    };

    // scheduler1 和 scheduler2 相互跟踪，共享 1 个跟踪器
    const scheduler1 = jest.fn(() => { tracker2.track(component) });
    const scheduler2 = jest.fn(() => { tracker1.track(component) });

    const tracker1 = new Tracker(scheduler1, "tracker1");
    const tracker2 = new Tracker(scheduler2, "tracker2");

    // 第一次渲染不会触发 track 指定的函数
    render();
    expect(scheduler1).toHaveBeenCalledTimes(0);
    expect(scheduler2).toHaveBeenCalledTimes(0);

    // 当修改值的时候，共享跟踪器只有 1 个发生响应
    obs.value = 123;

    expect(scheduler1).toHaveBeenCalledTimes(1);
    expect(scheduler2).toHaveBeenCalledTimes(0);
});