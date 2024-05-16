import { contains, observable } from "@formily/reactive";

// array observable 操作
test("array mutation", () => {
    const arr = observable([1, 2, 3, 4]);
    arr.splice(2, 1);

    expect(arr).toEqual([1, 2, 4]);
});

// contains 判断 observable 对象中是否包含指定对象
test("observable contains", () => {
    const subElement = { cc: 333 };
    const element = { aa: subElement };
    const arr = observable([element, 2, 3, 4] as const);

    expect(contains(arr, arr[0])).toBeTruthy();
    expect(contains(arr, arr[0].aa)).toBeTruthy();
    expect(contains(arr, element)).toBeTruthy();
    expect(contains(arr, subElement)).toBeTruthy();
    expect(contains(element, subElement)).toBeTruthy();
    expect(contains(element, arr[0].aa)).toBeTruthy();
    expect(contains(arr[0], subElement)).toBeTruthy();

    const obs = observable<Partial<Record<string, object>>>({});
    const other = { bb: 321 };

    // 这个时候 obs.other 是 undefined
    expect(contains(obs, obs.other)).toBeFalsy();

    obs.other = other;
    obs.arr = arr;

    // 这个时候 other 存在值了，由于 object 是值引用，赋值后一定会判断包含在对象中
    expect(contains(obs, obs.other)).toBeTruthy();
    expect(contains(obs, other)).toBeTruthy();
    expect(contains(obs, obs.arr)).toBeTruthy();
    expect(contains(obs, arr)).toBeTruthy();
});

// 不能直接设置 observable 的 __proto__，强行设置会被忽略
test("observable __proto__", () => {
    const observableArr = observable<Array<object>>([]);

    // @ts-ignore 这样赋值是不对的，会被忽略
    observableArr.__proto__ = Object.create(Array.prototype);

    observableArr[0] = {};
    expect(observableArr).toEqual([{}]);

    const observableObj = observable<{ aa?: object }>({});

    // @ts-ignore  这样赋值是不对的，会被忽略
    observableObj.__proto__ = Object.create(Object.prototype);

    observableObj.aa = {};
    expect(observableObj).toEqual({ aa: {} });
});