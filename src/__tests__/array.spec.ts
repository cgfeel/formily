import { createForm, onFieldValueChange, onFormInitialValuesChange, onFormValuesChange } from "@formily/core";
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

// 懒查询数组字段
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

// 虚拟子节点
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

// 交换子集
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

// 容错
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


// 突变容错 - 和上面一个单元测试一样
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

test("array field remove memo leak", async () => {
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