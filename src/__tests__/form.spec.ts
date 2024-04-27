import { createForm } from "@formily/core";
import { attach } from "./shared";

// 创建 form 对象并挂载
test('create form', () => {
    const form = attach(createForm());

    // form 对象不是 undefined
    expect(form).not.toBeUndefined();
});

// 测试创建字段
test('createField/createArrayField/createObjectField/createVoidField', () => {
    const form = attach(createForm());

    // 创建一个普通的字段并挂载
    const normal_ = attach(form.createField({ basePath: "parent", name: "normal" }));

    // 重复创建挂载一个字段名一样的普通字段
    const normal2_ = attach(form.createField({ basePath: "parent", name: "normal" }));

    // 创建一个数组字段并挂载
    const array_ = attach(form.createArrayField({ basePath: "parent", name: "array" }));

    // 重复创建挂载一个数组字段
    const array2_ = attach(form.createArrayField({ basePath: "parent", name: "array" }));

    // 创建一个对象字段并挂载
    const object_ = attach(form.createObjectField({ basePath: "parent", name: "object" }));

    // 重复创建挂载一个对象字段
    const object2_ = attach(form.createObjectField({ basePath: "parent", name: "object" }));

    // 创建一个虚拟字段并挂载
    const void_ = attach(form.createVoidField({ basePath: "parent", name: "void" }));

    // 重复创建挂载一个虚拟字段
    const void2_ = attach(form.createVoidField({ basePath: "parent", name: "void" }));

    // 在虚拟节点下创建并挂载一个普通字段
    const children_ = attach(form.createField({ basePath: "parent.void", name: "children" }));

    // 确认创建的字段不是 undefined
    expect(normal_).not.toBeUndefined();
    expect(array_).not.toBeUndefined();
    expect(object_).not.toBeUndefined();
    expect(void_).not.toBeUndefined();

    // 检查创建字段的 address 和 path
    expect(normal_.address.toString()).toEqual("parent.normal");
    expect(normal_.path.toString()).toEqual("parent.normal");
    expect(array_.address.toString()).toEqual("parent.array");
    expect(array_.path.toString()).toEqual("parent.array");
    expect(object_.address.toString()).toEqual("parent.object");
    expect(object_.path.toString()).toEqual("parent.object");
    expect(void_.address.toString()).toEqual("parent.void");
    expect(void_.path.toString()).toEqual("parent.void");

    // 虚拟节点下的字段 address 是完整的，path 不记录虚拟节点名
    expect(children_.address.toString()).toEqual("parent.void.children");
    expect(children_.path.toString()).toEqual("parent.children");

    // 字段名如果为空将不能创建字段，返回 undefined
    expect(form.createField({ name: "" })).toBeUndefined();
    expect(form.createArrayField({ name: "" })).toBeUndefined();
    expect(form.createObjectField({ name: "" })).toBeUndefined();
    expect(form.createVoidField({ name: "" })).toBeUndefined();

    // 对于不同的对象，但他们字段相同，返回的对象也完全相同
    expect(normal_ === normal2_).toBeTruthy();
    expect(array_ === array2_).toBeTruthy();
    expect(object_ === object2_).toBeTruthy();
    expect(void_ === void2_).toBeTruthy();
});

test("setValues/setInitialValues", () => {
    const form = attach(createForm());
    form.setValues({
        aa: 123,
        cc: { kk: 321 }
    });

    // 添加 2 个字段并设置初始值
    const field = attach(form.createField({ initialValue: "ooo", name: "cc.mm" }));
    const field2 = attach(form.createField({ initialValue: "www", name: "cc.pp" }));

    // 验证表单的值
    expect(form.values.aa).toEqual(123);
    expect(form.values.cc.kk).toEqual(321);

    // 验证表单初始值，没有设置值的情况下，初始值也是表单值
    expect(form.values.cc.mm).toEqual("ooo");
    expect(form.initialValues.cc.mm).toEqual("ooo");
    expect(form.values.cc.pp).toEqual("www");
    expect(form.initialValues.cc.pp).toEqual("www");

    // 验证表单值
    expect(field.value).toEqual("ooo");
    expect(field2.value).toEqual("www");

    // 设置表单初始值
    form.setInitialValues({
        bb: "123",
        cc: {
            dd: "xxx",
            pp: "www2",
        }
    });

    // 之前定义的字段没有修改，值也不变
    expect(form.values.aa).toEqual(123);
    expect(form.values.cc.kk).toEqual(321);

    // 之后添加的初始值
    expect(form.values.bb).toEqual("123");
    expect(form.values.cc.dd).toEqual("xxx");
});