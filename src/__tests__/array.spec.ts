import { createForm, isArrayField, isField, onFieldValueChange, onFormInitialValuesChange, onFormValuesChange } from "@formily/core";
import { attach } from "./shared";

// 创建数组字段
test("create array field", () => {
    const form = attach(createForm());
    const array = attach(form.createArrayField({ name: "array" }));

    expect(array.value).toEqual([]);
    expect(array.insert).toBeDefined();
    expect(array.move).toBeDefined();
    expect(array.moveDown).toBeDefined();
    expect(array.moveUp).toBeDefined();
    expect(array.pop).toBeDefined();
    expect(array.push).toBeDefined();
    expect(array.remove).toBeDefined();
    expect(array.shift).toBeDefined();
    expect(array.unshift).toBeDefined();
});

// 数组字段方法
test("array field methods", () => {
    const form = attach(createForm());
    const array = attach(form.createArrayField({ name: "array", value: [] }));

    // 往数组尾部追加元素，并触发 onInput
    const push = [{ aa: 11 }, { bb: 22 }];
    array.push(...push);
    expect(array.value).toEqual(push);

    // 弹出数组最后一个元素，并触发 onInput
    array.pop();
    expect(array.value).toEqual([{ aa: 11 }]);

    // 往数组头部追加元素，并触发 onInput
    array.unshift({ cc: 33 });
    expect(array.value).toEqual([{ cc: 33 }, { aa: 11 }]);

    // 删除指定索引的数组元素，并触发 onInput
    array.remove(1);
    expect(array.value).toEqual([{ cc: 33 }]);

    // 往数组中指定索引位置插入元素，并触发 onInput
    array.insert(1, { dd: 44 }, { ee: 55 });
    expect(array.value).toEqual([{ cc: 33 }, { dd: 44 }, { ee: 55 }]);

    // 移动数组指定索引元素到指定位置，并触发 onInput
    array.move(0, 2);
    expect(array.value).toEqual([{ dd: 44 }, { ee: 55 }, { cc: 33 }]);

    // 弹出数组第一个元素，并触发 onInput
    array.shift();
    expect(array.value).toEqual([{ ee: 55 }, { cc: 33 }]);

    array.push(...push);

    // 下移一位数组中指定索引元素，并触发 onInput
    array.moveDown(0);
    expect(array.value).toEqual([{ cc: 33 }, { ee: 55 }, ...push]);

    // 上移一位数组中指定索引元素，并触发 onInput
    array.moveUp(1);
    expect(array.value).toEqual([{ ee: 55 }, { cc: 33 }, ...push]);

    // 移动数组指定索引的元素到指定位置，并触发 onInput
    array.move(0, 2);
    expect(array.value).toEqual([{ cc: 33 }, { aa: 11 }, { ee: 55 }, { bb: 22 }]);
});

// 数组字段下标操作和交换
test("array field children state exchange", () => {
    const form = attach(createForm());
    const array = attach(form.createArrayField({ name: "array" }));
    attach(form.createField({ basePath: "array", name: "other" }));

    // 插入值
    const data = [{ value: 11 }, { value: 22 }];
    array.push(...data);

    attach(form.createField({ basePath: "array.0", name: "value" }));
    attach(form.createField({ basePath: "array.1", name: "value" }));
    expect(array.value).toEqual(data);
    expect(form.query("array.0.value").get("value")).toEqual(11);
    expect(form.query("array.1.value").get("value")).toEqual(22);
    expect(Object.keys(form.fields).sort()).toEqual([
        "array", 
        "array.0.value",
        "array.1.value",
        "array.other",
    ]);

    // 弹出最后的元素
    array.pop();
    expect(array.value).toEqual([{ value: 11 }]);
    expect(form.query("array.0.value").get("value")).toEqual(11);
    expect(form.query("array.1.value").get("value")).toBeUndefined();

    // 头部插入值，在这里并没有删除值，而是将原来的值和数组的位置一起移动到索引 1 这个位置了
    array.unshift({ value: 33 });
    expect(array.value).toEqual([{ value: 33 }, { value: 11 }]);
    expect(form.query("array.0.value").get("value")).toBeUndefined();
    expect(form.query("array.1.value").get("value")).toEqual(11);

    // 在这里我并没有像文档那样重复创建数组索引 1 的字段
    attach(form.createField({ basePath: "array.0", name:  "value" }));
    expect(array.value).toEqual([{ value: 33 }, { value: 11 }]);
    expect(form.query("array.0.value").get("value")).toEqual(33);
    expect(form.query("array.1.value").get("value")).toEqual(11);

    // 删除下标是 1 的元素
    array.remove(1);
    expect(array.value).toEqual([{ value: 33 }]);
    expect(form.query("array.0.value").get("value")).toEqual(33);
    expect(form.query("array.1.value").get("value")).toBeUndefined();

    // 在下标 1 的位置添加 2 个元素
    array.insert(1, { value: 44 }, { value: 55 });
    attach(form.createField({ basePath: "array.1", name: "value" }));
    attach(form.createField({ basePath: "array.2", name: "value" }));

    expect(array.value).toEqual([{ value: 33 }, { value: 44 }, { value: 55 }]);
    expect(form.query("array.0.value").get("value")).toEqual(33);
    expect(form.query("array.1.value").get("value")).toEqual(44);
    expect(form.query("array.2.value").get("value")).toEqual(55);

    // 将下标 0 移动到下标 2 的位置
    array.move(0, 2);
    expect(array.value).toEqual([{ value: 44 }, { value: 55 }, { value: 33 }]);
    expect(form.query("array.0.value").get("value")).toEqual(44);
    expect(form.query("array.1.value").get("value")).toEqual(55);
    expect(form.query("array.2.value").get("value")).toEqual(33);

    // 将下标 2 移动到下标 0 的位置
    array.move(2, 0);
    expect(array.value).toEqual([{ value: 33 }, { value: 44 }, { value: 55 }]);
    expect(form.query("array.0.value").get("value")).toEqual(33);
    expect(form.query("array.1.value").get("value")).toEqual(44);
    expect(form.query("array.2.value").get("value")).toEqual(55);
});

// 数组下标字段移动
test("array field move up/down then fields move", () => {
    const form = attach(createForm());
    const array = attach(form.createArrayField({ name: "array" }));

    attach(form.createField({ basePath: "array.0", name: "value" }));
    attach(form.createField({ basePath: "array.1", name: "value" }));
    attach(form.createField({ basePath: "array.2", name: "value" }));
    attach(form.createField({ basePath: "array.4", name: "value" }));

    const line0 = form.fields["array.0.value"];
    const line1 = form.fields["array.1.value"];
    const line2 = form.fields["array.2.value"];
    const line3 = form.fields["array.3.value"];

    array.push({ value: "0" }, { value: "1" }, { value: "2" }, { value: "3" });

    // 将下标 0 的元素移动到索引 3
    array.move(0, 3);
    expect(form.fields["array.0.value"]).toBe(line1);
    expect(form.fields["array.1.value"]).toBe(line2);
    expect(form.fields["array.2.value"]).toBe(line3);
    expect(form.fields["array.3.value"]).toBe(line0);

    // 将下标 3 的元素移动到索引 1
    array.move(3, 1);
    expect(form.fields["array.0.value"]).toBe(line1);
    expect(form.fields["array.1.value"]).toBe(line0);
    expect(form.fields["array.2.value"]).toBe(line2);
    expect(form.fields["array.3.value"]).toBe(line3);
});

// 查询数组字段下标路径
test("lazy array field query each", () => {
    const form = attach(createForm());
    const array = attach(form.createArrayField({ name: "array" }));

    const init = Array.from({ length: 6 }).map((_, value) => ({ value }));
    array.setValue(init);

    // page1: 0, 1
    // page2: 2, 3 untouch
    // page3: 4, 5
    init.forEach(({ value }) => {
        (value < 2 || value > 3) && attach(form.createField({ 
            basePath: `array.${value}`, name: "value" 
        }));
    });

    expect(Object.keys(form.fields)).toEqual([
        "array",
        "array.0.value",
        "array.1.value",
        "array.4.value",
        "array.5.value",
    ]);

    // 注意：插入新节点，如果指定位置有节点，会丢弃，需要重新插入节点，主要是为了防止上一个节点状态对新节点状态产生污染
    // 由于下边 1 存在节点，插入新的值，将丢弃原来的节点
    array.insert(1, { value: 11 });
    init.splice(1, 0, { value: 11 });

    // 由于插入的新的下标没有声明节点，所以不存在路径，但有值
    expect(() => form.query('*').take()).not.toThrow();
    expect(array.value).toEqual(init);
    
    // 由于下标 1 位置插入了 11，所以 1、4、5 都順移 1 位
    expect(form.query("array.0.value").value()).toEqual(0);
    expect(form.query("array.2.value").value()).toEqual(1);
    expect(form.query("array.5.value").value()).toEqual(4);
    expect(form.query("array.6.value").value()).toEqual(5);

    expect(Object.keys(form.fields)).toEqual([
        "array",
        "array.0.value",
        "array.5.value",
        "array.2.value",
        "array.6.value",
    ]);
});

// 数组字段中的虚拟子节点
test("void children", () => {
    const form = attach(createForm());
    const array = attach(form.createArrayField({ name: "array" }));

    attach(form.createField({ basePath: "array", name: "other" }));
    attach(form.createVoidField({ basePath: "array", name: "0" }));

    // 当虚拟节点作为数组索引本身的时候，虚拟节点下的节点值直接作为索引值
    const aaa = attach(form.createField({ basePath: "array.0", name: "aaa", value: 123 }));
    expect(aaa.value).toEqual(123);
    expect(array.value).toEqual([123])
});

// 交换数组字段的子集
test("exchange children", () => {
    const form = attach(createForm());
    const array = attach(form.createArrayField({ name: "array" }));

    attach(form.createField({ basePath: "array", name: "other" }));
    attach(form.createField({ basePath: "array", name: "0.aaa", value: "123" }));
    attach(form.createField({ basePath: "array", name: "0.bbb", value: "321" }));
    attach(form.createField({ basePath: "array", name: "1.bbb", value: "kkk" }));
    expect(array.value).toEqual([{ aaa: "123", bbb: "321" }, { bbb: "kkk" }]);

    // 将下标 0 向下移动个 1 位
    array.move(0, 1);
    expect(array.value).toEqual([{ bbb: "kkk" }, { aaa: "123", bbb: "321" }]);
    expect(form.query("array.0.aaa").take()).toBeUndefined();
});

// 数组字段容错
test("fault tolerance", () => {
    const form = attach(createForm());
    const array = attach(form.createArrayField({ name: "array" }));
    const array1 = attach(form.createArrayField({ name: "array2", value: [1, 2] }));

    // @ts-ignore 这是一个错误语法，会自动忽略
    array.setValue({});
    
    // 之后添加值可以拿到正确的值
    array.push(11);
    expect(array.value).toEqual([11]);

    array.pop();
    expect(array.value).toEqual([]);

    // 删除一个不存在的下标
    array.remove(1);
    expect(array.value).toEqual([]);

    // 弹出第一个不存在的元素
    array.shift();
    expect(array.value).toEqual([]);

    array.unshift(1);
    expect(array.value).toEqual([1]);

    // 交换长度只有 1 的数组下标
    array.move(0, 1);
    expect(array.value).toEqual([1]);

    // 长度只有 1 的数组，下标 1 上移一位
    array.moveUp(1);
    expect(array.value).toEqual([1]);

    // 长度只有 1 的数组，下标 1 下移一位
    array.moveDown(1);
    expect(array.value).toEqual([1]);

    // 数组插入只提供下标不提供值
    array.insert(1);
    expect(array.value).toEqual([1]);

    // 移动数组下标的位置为下标当前位置
    array1.move(1, 1);
    expect(array1.value).toEqual([1, 2]);

    // 插入下标 2 为 3，并上移一位
    array1.push(3);
    array1.moveUp(2);
    expect(array1.value).toEqual([1, 3, 2]);

    // 上移一位下标 0，结果是下标 0 移动到最后 1 位
    array1.moveUp(0);
    expect(array1.value).toEqual([3, 2, 1]);

    array1.moveDown(0);
    expect(array1.value).toEqual([2, 3, 1]);

    array1.moveDown(1);
    expect(array1.value).toEqual([2, 1, 3]);

    // 最后一位下标再下移一位，则变为第一位
    array1.moveDown(2);
    expect(array1.value).toEqual([3, 2, 1]);
});


// 修改数组字段容错 - 和上面一个单元测试一样
test("mutation fault tolerance", () => {
    const form = attach(createForm());
    const pushArray = attach(form.createArrayField({ name: "array1" }));
    const popArray = attach(form.createArrayField({ name: "array2" }));
    const insertArray = attach(form.createArrayField({ name: "array3" }));
    const removeArray = attach(form.createArrayField({ name: "array4" }));
    const shiftArray = attach(form.createArrayField({ name: "array5" }));
    const unshiftArray = attach(form.createArrayField({ name: "array6" }));
    const moveArray = attach(form.createArrayField({ name: "array7" }));
    const moveUpArray = attach(form.createArrayField({ name: "array8" }));
    const moveDownArray = attach(form.createArrayField({ name: "array9" }));

    // @ts-ignore 设置一个类型不正确的值
    pushArray.setValue({});

    // 插入一个值
    pushArray.push(123);
    expect(pushArray.value).toEqual([123]);

    // popArray 的值默认是 []
    expect(popArray.value).toEqual([]);

    // @ts-ignore 设置一个类型不正确的值，默认值变量，但字段类型没变
    popArray.setValue({});
    expect(popArray.value).toEqual({});

    // 弹出最后一个下标
    popArray.pop();
    expect(popArray.value).toEqual({});

    // @ts-ignore insertArray 设置一个类型不正确的值后，在下标 0 的位置插入一个值
    insertArray.setValue({});
    insertArray.insert(0, 123);
    expect(insertArray.value).toEqual([123]);

    // @ts-ignore 删除不存在的下标
    removeArray.setValue({});
    removeArray.remove(0);
    expect(removeArray.value).toEqual({});

    // @ts-ignore 从空数组头部移出一位
    shiftArray.setValue({});
    shiftArray.shift();
    expect(shiftArray.value).toEqual({});

    // @ts-ignore 从数组头部压入一个数据
    unshiftArray.setValue({});
    unshiftArray.unshift(123);
    expect(unshiftArray.value).toEqual([123]);

    // @ts-ignore 移动一个空数组的下标
    moveArray.setValue({});
    moveArray.move(0, 1);
    expect(moveArray.value).toEqual({});

    // @ts-ignore 往上移动一位空数组
    moveUpArray.setValue({});
    moveUpArray.moveUp(0);
    expect(moveUpArray.value).toEqual({});

    // @ts-ignore 往下移动一位数组
    moveDownArray.setValue({});
    moveDownArray.moveDown(0);
    expect(moveDownArray.value).toEqual({});
});

// 数组字段通过 move api 移动子集
test("array field move api with children", () => {
    const form = attach(createForm());
    attach(form.createField({ name: "other" }));

    const array = attach(form.createArrayField({ name: "array" }));
    attach(form.createArrayField({ basePath: "array", name: "0" }));
    attach(form.createArrayField({ basePath: "array", name: "1" }));
    attach(form.createArrayField({ basePath: "array", name: "2" }));
    attach(form.createArrayField({ basePath: "array.2", name: "name" }));

    // 原本在最后一位才有子集
    expect(form.fields["array.0.name"]).toBeUndefined();
    expect(form.fields["array.1.name"]).toBeUndefined();
    expect(form.fields["array.2.name"]).toBeDefined();

    // 将第一位移动到最后一位，后面两位都往前移动一位
    array.move(0, 2);
    expect(form.fields["array.0.name"]).toBeUndefined();
    expect(form.fields["array.1.name"]).toBeDefined();
    expect(form.fields["array.2.name"]).toBeUndefined();
});

// 数组添加、删除、创建子字段触发回调
test("array field remove memo leak", () => {
    const handler = jest.fn();
    const valuesChange = jest.fn();
    const initialValuesChange = jest.fn();
    const form = attach(createForm({
        effects() {
            onFormValuesChange(valuesChange);
            onFormInitialValuesChange(initialValuesChange);
            onFieldValueChange("*", handler);
        }
    }));

    // 创建表单没有变化
    expect(valuesChange).toHaveBeenCalledTimes(0);

    // 创建字段触发表单值改变
    const array = attach(form.createArrayField({ name: "array" }));
    expect(valuesChange).toHaveBeenCalledTimes(1);
    
    // 数组字段插入值触发表单值更新
    array.push("");
    expect(valuesChange).toHaveBeenCalledTimes(2);

    // 数组字段插入子集表单值不更新
    attach(form.createField({ basePath: "array", name: "0" }));
    expect(valuesChange).toHaveBeenCalledTimes(2);
    
    // 删除下标触发表单值更新并同时删除子集
    array.remove(0);
    expect(valuesChange).toHaveBeenCalledTimes(3);

    // 再次插入值触发表单值更新
    array.push("");
    expect(valuesChange).toHaveBeenCalledTimes(4);

    // 数组字段插入子集表单值不更新
    attach(form.createField({ basePath: "array", name: "0" }));
    expect(valuesChange).toHaveBeenCalledTimes(4);

    // 数组子集的添加删除，数组字段添加和删除数据，都不会触发字段变更、也不会触发初始值变更
    expect(handler).toHaveBeenCalledTimes(0);
    expect(initialValuesChange).toHaveBeenCalledTimes(0);
});

// 嵌套字段的indexes，以及删除数组下的节点的坑点
test("nest array remove", () => {
    const form = attach(createForm());
    const metrics = attach(form.createArrayField({ name: "metrics" }));

    const mObjA = attach(form.createObjectField({ basePath: "metrics", name: "0" }));
    const mObjB = attach(form.createObjectField({ basePath: "metrics", name: "1" }));

    const mObjA0 = attach(form.createArrayField({ basePath: "metrics.0", name: "content" }));
    const mObjB0 = attach(form.createArrayField({ basePath: "metrics.1", name: "content" }));

    const obj00 = attach(form.createObjectField({ basePath: "metrics.0.content", name: "0" }));
    const obj10 = attach(form.createObjectField({ basePath: "metrics.1.content", name: "0" }));

    const attr00 = attach(form.createField({ basePath: "metrics.0.content.0", initialValue: "123", name: "attr" }));
    const attr10 = attach(form.createField({ basePath: "metrics.1.content.0", initialValue: "123", name: "attr" }));

    // 有一个快速的获取 indexes 的办法，就是去数节点路径中，有几个是数字路径
    // 最外层的数组字段是没有 indexes 的
    // [], path: metrics
    expect(metrics.indexes).toEqual([]);

    // 数组对象下的两个对象字段，分别索引为 index
    // [{}, {}], path: metrics.0, metrics.1
    expect(mObjA.indexes).toEqual([0]);
    expect(mObjB.indexes).toEqual([1]);

    //  对象字段没有索引，所以下面的数组字段按照 parent 的 index
    // [{ content: [] }, { content: [] }], path: metrics.0.content, metrics.1.content
    expect(mObjA0.indexes).toEqual([0]);
    expect(mObjB0.indexes).toEqual([1]);

    //  对象字段下的数组索引，按照父级索引，再到当前索引
    // [{ content: [{}] }, { content: [{}] }], path: metrics.0.content.0, metrics.1.content.0
    expect(obj00.indexes).toEqual([0, 0]);
    expect(obj10.indexes).toEqual([1, 0]);

    // 叶子节点是普通字段，本身没有索引，按照父级索引
    // [{ content: [{ attr: "123" }] }, { content: [{ attr: "123"  }] }]
    // path: metrics.0.content.0.attr, metrics.1.content.0.attr
    expect(attr00.indexes).toEqual([0, 0]);
    expect(attr10.indexes).toEqual([1, 0]);

    // 按照上面的规则开始拿索引
    expect(obj00.indexes[0]).toBe(0);

    // index 的索引取 indexes 的最后一个值，这里的 indexes 是 [0, 0]
    expect(obj00.index).toBe(0);

    // index 的索引取 indexes 的最后一个值，这里的 indexes 是 [1, 0]
    expect(obj10.index).toBe(0);
    expect(obj10.indexes[0]).toBe(1);

    // 等同 mObjB0，删除的是 obj10，注意：remove 不需要像文档一样，通过异步删除
    const m1Content = form.query("metrics.1.content").take();
    if (isArrayField(m1Content)) {
        m1Content.remove(0);
    }
    
    // 文档这里有错误，删除的是 metrics.1 下的字段，查询的是 metrics.0 的字段
    expect(form.fields["metrics.0.content.0.attr"]).toBeDefined();
    expect(form.fields["metrics.1.content.0"]).toBeUndefined();

    // 神奇的事情来了，remove 可以删除节点，也可以删除节点值，但删除不了初始值
    expect(form.initialValues.metrics?.[1]?.content?.[0]?.attr).toEqual("123");
    expect(form.values.metrics?.[1]?.content?.[0]?.attr).toBeUndefined();

    // 再把字段加回来，神奇的事情又发生了，之前的初始值和字段值都加回来了，要避免意想不到的情况，记得加上初始值哦
    attach(form.createObjectField({ basePath: "metrics.1.content", name: "0" }));
    attach(form.createField({ basePath: "metrics.1.content.0", name: "attr" }));

    expect(form.initialValues.metrics?.[1]?.content?.[0]?.attr).toEqual("123");
    expect(form.values.metrics?.[1]?.content?.[0]?.attr).toEqual("123");
});

// 数组字段的 indexes 需要避免无效的数字
test("indexes: nest path need exclude incomplete number", () => {
    const form = attach(createForm());
    const objPathIncludeNum = attach(form.createField({ basePath: "metrics.0.a.10.iconWidth50", name: "attr" }));

    // 巩固：快速的获取 indexes 的办法，就是去数节点路径中，有几个是数字路径，哪怕路径父级节点不存在
    // 获取的indexes，就是路径中的数字集合，顺序按照路径从左到右的数组，且数字类型是数值
    // index 获取的是 indexes 最后一个值
    expect(objPathIncludeNum.indexes.length).toBe(2);
    expect(objPathIncludeNum.indexes).toEqual([0, 10]);
    expect(objPathIncludeNum.index).toBe(10);
});

// 在数组字段中没有字段的节点
test("incomplete insertion of array elements", () => {
    const form = attach(createForm({
        values: {
            array: [{ aa: 1 }, { aa: 2 }, { aa: 3 }],
        }
    }));
    
    const array = attach(form.createArrayField({ name: "array" }));
    attach(form.createObjectField({ basePath: "array", name: "0" }));
    attach(form.createField({ basePath: "array.0", name: "aa" }));
    attach(form.createObjectField({ basePath: "array", name: "2" }));
    attach(form.createField({ basePath: "array.2", name: "aa" }));

    expect(form.fields["array.0.aa"]).toBeDefined();
    expect(form.fields["array.1.aa"]).toBeUndefined();
    expect(form.fields["array.2.aa"]).toBeDefined();

    // 在数据头部插入一个节点，但不创建字段，现有的字段往后挪一个位置
    array.unshift({});
    expect(form.fields["array.0.aa"]).toBeUndefined();
    expect(form.fields["array.1.aa"]).toBeDefined();
    expect(form.fields["array.2.aa"]).toBeUndefined();
    expect(form.fields["array.3.aa"]).toBeDefined();
});

// 数组节点中可以跳过虚拟节点，直接获取数据
test("void array items need skip data", () => {
    const form = attach(createForm());
    const array = attach(form.createArrayField({ name: "array" }));
    const array2 = attach(form.createArrayField({ name: "array2" }));

    attach(form.createVoidField({ basePath: "array", name: "0" }));
    attach(form.createVoidField({ basePath: "array.0", name: "space" }));
    attach(form.createVoidField({ basePath: "array2", name: "0" }));

    const select = attach(form.createField({ basePath: "array.0.space", name: "select" }));
    const select2 = attach(form.createField({ basePath: "array2.0", name: "select2" }));

    select.value = 123
    select2.value = 123;
    expect(array.value).toEqual([123]);
    expect(array2.value).toEqual([123]);
});

// 数组字段清空
test("array field reset", () => {
    const form = attach(createForm());
    const array = attach(form.createArrayField({ name: "array" }));

    attach(form.createObjectField({ basePath: "array", name: "0" }));
    attach(form.createObjectField({ basePath: "array.0", name: "input", value: "123" }));

    // 带有 value 的数组重置，会将数组下的字段全部清空
    form.reset("*");
    expect(form.values).toEqual({ array: [] });
    expect(form.fields["array.0"]).toBeUndefined();
    expect(array.value).toEqual([]);

    // 带有  initialValue 的数组重置，数组字段会变成一个空的对象值
    attach(form.createObjectField({ basePath: "array", name: "0" }));
    attach(form.createObjectField({ basePath: "array.0", initialValue: "123", name: "input" }));

    form.reset("*");
    expect(form.values).toEqual({ array: {} });
    expect(form.fields["array.0"]).toBeUndefined();
    expect(array.value).toEqual({});

    // 强制清空带有 initialValue 的数组字段，效果同 value
    // 但是有一点，重复创建带有 initialValue 的字段，会不受数组字段清空销毁，因此下面获取数组下的字段并非 unndefined
    // 同理，如果重复创建带有 initialValue 的字段，如果不强制清空的清空下，值也会被保留
    attach(form.createObjectField({ basePath: "array", name: "0" }));
    attach(form.createObjectField({ basePath: "array.0", initialValue: "123", name: "input" }));

    form.reset("*", { forceClear: true });
    expect(form.values).toEqual({ array: [] });
    expect(form.fields["array.0"]).toBeDefined();
    expect(array.value).toEqual([]);
});

// 数组字段删除节点不会导致内存泄露
test("array field remove can not memory leak", () => {
    const handler = jest.fn();
    const form = attach(createForm({
        values: {
            array: [{ aa: 1 }, { aa: 2 }]
        },
        effects() {
            onFieldValueChange("array.*.aa", handler);
        }
    }));

    const array = attach(form.createArrayField({ name: "array" }));
    attach(form.createObjectField({ basePath: "array", name: "0" }));
    attach(form.createField({ basePath: "array.0", name: "aa" }));
    attach(form.createObjectField({ basePath: "array", name: "1" }));
    attach(form.createField({ basePath: "array.1", name: "aa" }));

    const bb = attach(form.createField({
        basePath: "array.1",
        name: "bb",
        reactions: field => {
            field.visible = field.query(".aa").value() === "123";
        }
    }));

    expect(bb.visible).toBeFalsy();

    // 删除下标 0 的字段，后面的字段你将自动向上移动一位
    array.remove(0);
    expect(form.fields["array.1.aa"]).toBeUndefined();

    // 修改值后，使其展示
    form.query("array.0.aa").take(field => {
        if (isField(field)) field.value = "123";
    });
    expect(bb.visible).toBeTruthy();

    // 这个是否发现只调用了 1 次，再次说明
    // onFieldValueChange 在数组字段添加、删除节点不触发、只有修改值的时候才触发
    expect(handler).toHaveBeenCalledTimes(1);
});

// 数组字段修补值
test("array field patch values", () => {
    const form = attach(createForm());
    const arr = attach(form.createArrayField({ name: "a" }));

    arr.unshift({});
    attach(form.createObjectField({ basePath: "a", name: "0" }));
    attach(form.createField({ basePath: "a.0", initialValue: "A", name: "c" }));
    expect(form.values).toEqual({ a: [{ c: "A" }] });

    // 再次重头部插入一个对象，之前的字段将后移一位
    arr.unshift({});
    expect(form.fields["a.1.c"]).toBeDefined();

    // 在这里添加头部字段，但和文档不同，不用添加下标 1 的字段，因为已存在
    attach(form.createObjectField({ basePath: "a", name: "0" }));
    attach(form.createField({ basePath: "a.0", initialValue: "A", name: "c" }));
    expect(form.values).toEqual({ a: [{ c: "A" }, { c: "A" }] });
});

// 数组字段初始值通过 remove 删除
test("array remove with initialValues", () => {
    const initialValues = {
        array: [{ a: 1 }, { a: 2 }],
    };
    
    const form = attach(createForm({ initialValues }));
    const array = attach(form.createArrayField({ name: "array" }));

    attach(form.createObjectField({ basePath: "array", name: "0" }));
    attach(form.createObjectField({ basePath: "array", name: "1" }));
    attach(form.createField({ basePath: "array.0", name: "a" }));
    attach(form.createField({ basePath: "array.1", name: "a" }));
    expect(form.values).toEqual(initialValues);

    // 删除下标 1，value 会改变，initialValue 不改变
    array.remove(1);
    expect(form.values).toEqual({ array: [{ a: 1 }] });
    expect(form.initialValues).toEqual(initialValues);

    // 重置字段，拥有初始字段不受影响，但是下标 1 的字段在此之前已经 remove 了
    form.reset();
    expect(form.fields["array.0.a"]).toBeDefined();
    expect(form.fields["array.1.a"]).toBeUndefined();

    // 重新添加下标 1 的字段，文档中重复创建了下标 0 的字段，会被忽略
    attach(form.createObjectField({ basePath: "array", name: "1" }));
    attach(form.createField({ basePath: "array.1", name: "a" }));

    expect(form.values).toEqual(initialValues);
    expect(form.initialValues).toEqual(initialValues);

    // 再次重置，值和字段都不变，因为数组的初始值不受 reset 改变
    form.reset();
    expect(form.fields["array.0.a"]).toBeDefined();
    expect(form.fields["array.1.a"]).toBeDefined();

    // 只有强制清除才能清空字段和值
    form.reset("*", { forceClear: true });
    expect(form.values).toEqual({ array: [] });
    expect(form.fields["array.0.a"]).toBeUndefined();
    expect(form.fields["array.1.a"]).toBeUndefined();
});

// 从 records 中查找数组字段
test("records: find array fields", () => {
    const initialValues = {
        array: [{ a: 1 }, { a: 2 }]
    }

    const form = attach(createForm({ initialValues }));
    attach(form.createArrayField({ name: "array" }));
    attach(form.createObjectField({ basePath: "array", name: "0" }));
    attach(form.createObjectField({ basePath: "array", name: "1" }));

    const field0 = attach(form.createField({ basePath: "array.0", name: "a" }));
    const field1 = attach(form.createField({ basePath: "array.1", name: "a" }));

    expect(field0.records.length).toBe(2);
    expect(field0.records).toEqual(initialValues.array);
    expect(field1.records).toEqual(initialValues.array);
    expect(field0.record).toEqual(initialValues.array[0]);
    expect(field1.record).toEqual(initialValues.array[1]);
});

// 在数组嵌套字段中查找 record
test("record: find array nest field record", () => {
    const initialValues = {
        array: [{ a: { b: { c: 1, d: 1 } } }, { a: { b: { c: 2, d: 2 } } }]
    };

    const form = attach(createForm({ initialValues }));
    attach(form.createArrayField({ name: "array" }));
    attach(form.createObjectField({ basePath: "array", name: "0" }));
    attach(form.createObjectField({ basePath: "array.0", name: "a" }));
    attach(form.createObjectField({ basePath: "array.0.a", name: "b" }));
    attach(form.createObjectField({ basePath: "array", name: "1" }));
    attach(form.createObjectField({ basePath: "array.1", name: "a" }));
    attach(form.createObjectField({ basePath: "array.1.a", name: "b" }));

    const field0 = attach(form.createField({ basePath: "array.0.a.b", name: "c" }));
    const field1 = attach(form.createField({ basePath: "array.1.a.b", name: "c" }));
    const field2 = attach(form.createField({ basePath: "array.1.a.b.c", name: "cc" }));

    expect(field0.records.length).toBe(2);
    expect(field1.records.length).toBe(2);
    
    // records 会找到最近的对象字段集合
    expect(field1.records).toEqual(initialValues.array);

    // 而 record 则找到最近的字段
    expect(field0.record).toEqual({ c: 1, d: 1 });
    expect(field1.record).toEqual({ c: 2, d: 2 });

    // 如果当前字段是 undefined，就往上找一级
    expect(field2.record).toEqual({ c: 2, d: 2 });

    // 重新做个测试
    const form1 = attach(createForm({ 
        initialValues: {
            array: [
                { a: [{ c: [1, 2], d: [1, 2] }] }, 
                { a: [{ c: [1, 2], d: [1, 2] }] }
            ]
        } 
    }));

    attach(form1.createArrayField({ name: "array" }));
    attach(form1.createObjectField({ basePath: "array", name: "0" }));
    attach(form1.createArrayField({ basePath: "array.0", name: "a" }));
    attach(form1.createObjectField({ basePath: "array.0.a", name: "0" }));
    const a0c0 = attach(form1.createArrayField({ basePath: "array.0.a.0", name: "c" }));
    attach(form1.createField({ basePath: "array.0.a.0.c", name: "0" }));
    attach(form1.createField({ basePath: "array.0.a.0.c", name: "1" }));
    attach(form1.createArrayField({ basePath: "array.0.a.0", name: "d" }));
    attach(form1.createField({ basePath: "array.0.a.0.d", name: "0" }));
    const a0d1 = attach(form1.createField({ basePath: "array.0.a.0.d", name: "1" }));

    attach(form1.createObjectField({ basePath: "array", name: "1" }));
    attach(form1.createArrayField({ basePath: "array.1", name: "a" }));
    attach(form1.createObjectField({ basePath: "array.1.a", name: "0" }));
    const a1c0 = attach(form1.createArrayField({ basePath: "array.1.a.0", name: "c" }));
    attach(form1.createField({ basePath: "array.1.a.0.c", name: "0" }));
    attach(form1.createField({ basePath: "array.1.a.0.c", name: "1" }));
    attach(form1.createArrayField({ basePath: "array.1.a.0", name: "d" }));
    attach(form1.createField({ basePath: "array.1.a.0.d", name: "0" }));
    const a1d1 = attach(form1.createField({ basePath: "array.1.a.0.d", name: "1" }));

    expect(a0d1.records.length).toBe(2);
    expect(a1d1.records.length).toBe(2);
    
    // records 会找到最近的对象字段集合
    expect(a1d1.records).toEqual([1, 2]);

    // 在当前集合中找到自身匹配的字段值
    expect(a0d1.record).toBe(2);
    expect(a1d1.record).toBe(2);

    expect(a0c0.records).toEqual([{ c: [1, 2], d: [1, 2] }]);
    expect(a1c0.records).toEqual([{ c: [1, 2], d: [1, 2] }]);
    expect(a0c0.record).toEqual({ c: [1, 2], d: [1, 2] });
    expect(a1c0.record).toEqual({ c: [1, 2], d: [1, 2] });
});

// 查找数组字段中的 `record`
test("record: find array field record", () => {
    const form = attach(createForm({
        initialValues: {
            array: [1, 2, 3]
        }
    }));

    attach(form.createArrayField({ name: "array" }));
    const field = attach(form.createField({ basePath: "array", name: "0" }));

    expect(field.records.length).toBe(3);
    expect(field.record).toEqual(1);
});

// 获取对象字段的 `record`
test("record: find object field record", () => {
    const form = attach(createForm({
        initialValues: {
            a: { b: { c: 1, d: 1 } }
        }
    }));

    attach(form.createObjectField({ name: "a" }));
    attach(form.createObjectField({ basePath: "a", name: "b" }));

    // 对象中不能获取上级集合，只有数组中才有，但是可以拿自身的集合
    const field = attach(form.createObjectField({ basePath: "a.b", name: "c" }));
    expect(field.records).toBeUndefined();
    expect(field.record).toEqual({ c: 1, d: 1 });
});

// 获取表单的 `record`
test("record: find form fields", () => {
    const initialValues = {
        array: [{ a: 1 }, { a: 2 }],
    };

    const form = attach(createForm({ initialValues }));
    const array = attach(form.createArrayField({ name: "array" }));
    
    // 表单根字段，则获取的集合是整个表单的值
    expect(array.record).toEqual(initialValues);
});