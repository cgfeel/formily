import { isObservable, isSupportObservable, markObservable, markRaw, observable, toJS } from "@formily/reactive";

// 判断可以作为 observable 对象的类型：
//  - observable 对象、不在排除范围的对象（类声明对象、普通对象、Array、Map、WeakMap、Set、WeakSet对象）
// 不可以作为响应劫持对象的类型：
//  - null、React Node、MomentJS 对象、JSON Schema、带有 toJS/toJSON 方法的对象
test("is support observable", () => {
    const obs = observable({ aa: 111 });
    class ClassRaw {};

    // 判断某个对象是否可以被 observable
    expect(isSupportObservable(obs)).toBeTruthy();
    expect(isSupportObservable(new ClassRaw)).toBeTruthy();
    expect(isSupportObservable([])).toBeTruthy();
    expect(isSupportObservable({})).toBeTruthy();
    expect(isSupportObservable(new Map)).toBeTruthy();
    expect(isSupportObservable(new WeakMap)).toBeTruthy();
    expect(isSupportObservable(new Set)).toBeTruthy();
    expect(isSupportObservable(new WeakSet)).toBeTruthy();

    expect(isSupportObservable(null)).toBeFalsy();
    /**
     * React Node对象是不能作为响应劫持对象的
     *  - $$typeof : 一个可以防止 XSS 安全攻击的标记符号。
     *  - _owner: 这指的是该 React 元素的所有者。具体来说，是在它被创建时 current fiber 对应的组件。
     */
    expect(isSupportObservable({ $$typeof: {}, _owner: {} })).toBeFalsy();
    
    // Moment.js 对象也不能作为响应劫持对象
    // _isAMomentObject 属性暗示这可能是 Moment.js 库创建的日期时间对象的一部分。
    expect(isSupportObservable({ _isAMomentObject: {} })).toBeFalsy();

    // JSON Schema 不能作为响应劫持对象
    // JSON Schema 定义了一个 JSON 文件应该如何看起来 - 它的规模，数据类型，数据结构等等
    expect(isSupportObservable({ _isJSONSchemaObject: {} })).toBeFalsy();

    // 带有 toJS 方法的对象不能作为响应劫持的对象
    expect(isSupportObservable({ toJS: () => {} })).toBe(false);

    // 带有 toJSON 方法的对象不能作为响应劫持的对象
    expect(isSupportObservable({ toJSON: () => {} })).toBe(false);
});

describe("mark operation", () => {
    // 普通对象可以作为 observable 对象
    test("plain object should be observable", () => {
        const obs = observable({ aa: 111 });
        expect(isObservable(obs)).toBeTruthy();
    });

    // 类声明对象可以作为 observable 对象
    test("class instance should be observable", () => {
        class ClassRaw {};
        const obs = observable(new ClassRaw());
        const obs2 = observable(new ClassRaw());

        expect(isObservable(obs)).toBeTruthy();
        expect(isObservable(obs2)).toBeTruthy();
    });

    // 带有 toJS 方法的对象不能作为 observable 对象
    test("object with toJS function should NOT be observable", () => {
        const obs = observable({ aa: 111, toJS: () => {} });
        expect(isObservable(obs)).toBeFalsy();
    });

    // 通过 makeRaw 创建一个永远不可以作为 observable 的对象
    test("plain object marked as raw should NOT be observable", () => {
        const obs = observable(markRaw({ aaa: 111 }));

        // obs: { aaa: 111, [Symbol(RAW_TYPE)]: true }
        expect(isObservable(obs)).toBeFalsy();
    });

    // 通过 makeRaw 标记一个类，使其声明的对象永远不可作为 observable
    test("class marked as raw instance should NOT be observable", () => {
        class ClassRaw {}
        markRaw(ClassRaw);

        const obs = observable(new ClassRaw);
        const obs2 = observable(new ClassRaw);

        expect(isObservable(obs)).toBeFalsy();
        expect(isObservable(obs2)).toBeFalsy();
    });

    // 通过 markObservable 将一个带有 toJS 方法的对象作为 observable
    test("object with toJS function marked as observable should be observable", () => {
        const obs = observable(markObservable({ aa: 111, toJS: () => {} }));
        
        // obs: { aa: 111, toJS: [Function: toJS], [Symbol(OBSERVABLE_TYPE)]: true }
        expect(isObservable(obs)).toBeTruthy();
    });

    // markRaw 的权重比 markObservable 高，markRaw 标记过的对象不可作为 observable
    test("plain object marked as raw and observable should NOT be observable", () => {
        const obs = observable(markRaw(markObservable({ aa: 111 })));
        expect(isObservable(obs)).toBeFalsy();
    });

    // markRaw 的权重比 markObservable 高，markObservable 包裹 markRaw 也不可作为 observable
    test("plain object marked as observable and raw should NOT be observable", () => {
        const obs = observable(markObservable(markRaw({ aa: 111 })));
        expect(isObservable(obs)).toBeFalsy();
    });

    // markObservable 只能赋予对象作为 observable，不能赋予 function
    test("function marked as observable should NOT be observable", () => {
        expect(() => observable(markObservable(() => {}))).toThrow();
    });
});

// 递归 observable 并打印 JS
test("recursive references tojs", () => {
    const obj: any = { aa: 111 };
    obj.obj = obj;

    const obs = observable(obj);
    obs.obs = obs;

    const arr = [{ aa: 1 }, { bb: 2 }, { cc: 3 }];
    const arrObs = observable(arr);

    expect(toJS(obs)).toBeTruthy();
    expect(toJS(arrObs)).toEqual(arr);
});