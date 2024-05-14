import { autorun, observable, raw } from "@formily/reactive";

// 劫持 Set 类型对象作为响应对象
describe("Set", () => {
    // 创建一个 Set 类型的响应劫持对象
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
        autorun(() => handler(set.has('alue')));
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(false);

        // 由于 auturun 收集的依赖是 alue，而不是 value，所以这里不会响应
        set.add("value");
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenLastCalledWith(false);

        // 重新再来一次
        autorun(() => handler(set.has('value')));
        expect(handler).toHaveBeenCalledTimes(2);
        expect(handler).toHaveBeenCalledWith(true);

        // 重新再来一次，监听新的值
        autorun(() => handler(set.has('newValue')));
        expect(handler).toHaveBeenCalledTimes(3);
        expect(handler).toHaveBeenCalledWith(false);

        set.add("newValue");
        expect(handler).toHaveBeenCalledTimes(4);
        expect(handler).toHaveBeenLastCalledWith(true);

        set.delete("newValue");
        expect(handler).toHaveBeenCalledTimes(5);
        expect(handler).toHaveBeenLastCalledWith(false);
    });
});