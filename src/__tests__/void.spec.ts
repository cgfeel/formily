import { createForm } from "@formily/core";
import { FC } from "react";
import { attach } from "./shared";

const Component: FC = () => null;

// 创建虚拟节点，注销虚拟节点
test("create void field", () => {
  const form = attach(createForm());

  const field = attach(form.createVoidField({ name: "void" }));
  expect(form.fields["void"]).toBeDefined();

  field.destroy();
  expect(form.fields["void"]).toBeUndefined();
});

// 创建带有属性的虚拟节点
test("create void field props", () => {
  const form = attach(createForm());
  const field1 = attach(
    form.createVoidField({
      description: "This is Field 1",
      name: "field1",
      title: "Field1",
    }),
  );

  const field2 = attach(
    form.createVoidField({
      disabled: true,
      hidden: true,
      name: "field2",
    }),
  );

  const field3 = attach(
    form.createVoidField({
      name: "field3",
      readOnly: true,
      visible: false,
    }),
  );

  expect(field1.description).toEqual("This is Field 1");
  expect(field1.title).toEqual("Field1");
  expect(field2.pattern).toEqual("disabled");
  expect(field2.disabled).toBeTruthy();
  expect(field2.display).toEqual("hidden");
  expect(field2.hidden).toBeTruthy();
  expect(field3.pattern).toEqual("readOnly");
  expect(field3.readOnly).toBeTruthy();
  expect(field3.display).toEqual("none");
  expect(field3.visible).toBeFalsy();
});

// 设置组件和组件属性
test("setComponent/setComponentProps", () => {
  const form = attach(createForm());
  const field = attach(form.createVoidField({ name: "aa" }));

  field.setComponent(Component, { props: 123 });
  expect(Array.isArray(field.component) ? field.component[0] : undefined).toEqual(Component);
  expect(Array.isArray(field.component) ? field.component[1] : undefined).toEqual({ props: 123 });

  field.setComponentProps({ hellow: "world" });
  expect(Array.isArray(field.component) ? field.component[1] : undefined).toEqual({
    hellow: "world",
    props: 123,
  });
});

// 设置标题、描述
test("setTitle/setDescription", () => {
  const form = attach(createForm());
  const aa = attach(form.createVoidField({ name: "aa" }));

  aa.setTitle("AAA");
  aa.setDescription("This is AAA");

  expect(aa.title).toEqual("AAA");
  expect(aa.description).toEqual("This is AAA");
});

// 设置组件和组件属性-1
test("setComponent/setComponentProps-1", () => {
  const form = attach(createForm());
  const field = attach(form.createVoidField({ name: "aa" }));

  field.setComponent(undefined, { props: 123 });
  field.setComponent(Component);

  expect(Array.isArray(field.component) ? field.component[0] : undefined).toEqual(Component);
  expect(Array.isArray(field.component) ? field.component[1] : undefined).toEqual({ props: 123 });

  field.setComponentProps({ hello: "world" });
  expect(Array.isArray(field.component) ? field.component[1] : undefined).toEqual({
    hello: "world",
    props: 123,
  });
});

// 设置包装器和包装器属性
test("setDecorator/setDecoratorProps", () => {
  const form = attach(createForm());
  const field = attach(form.createVoidField({ name: "aa" }));

  field.setDecorator(undefined, { props: 123 });
  field.setDecorator(Component);

  expect(Array.isArray(field.decorator) ? field.decorator[0] : undefined).toEqual(Component);
  expect(Array.isArray(field.decorator) ? field.decorator[1] : undefined).toEqual({ props: 123 });

  field.setDecoratorProps({ hello: "world" });
  expect(Array.isArray(field.decorator) ? field.decorator[1] : undefined).toEqual({
    hello: "world",
    props: 123,
  });
});

// 设置、获取状态
test("setState/getState", () => {
  const form = attach(createForm());
  const aa = attach(form.createVoidField({ name: "aa" }));
  const state = aa.getState();

  aa.setState(state => {
    state.title = "AAA";
  });
  expect(aa.title).toEqual("AAA");

  aa.setState(state);
  expect(aa.title).toBeUndefined();

  aa.setState(state => {
    state.hidden = false;
  });
  expect(aa.display).toEqual("visible");

  aa.setState(state => {
    state.visible = true;
  });
  expect(aa.display).toEqual("visible");

  aa.setState(state => {
    state.readOnly = false;
  });
  expect(aa.pattern).toEqual("editable");

  aa.setState(state => {
    state.disabled = false;
  });
  expect(aa.pattern).toEqual("editable");

  aa.setState(state => {
    state.editable = true;
  });
  expect(aa.pattern).toEqual("editable");

  aa.setState(state => {
    state.editable = false;
  });
  expect(aa.pattern).toEqual("readPretty");

  aa.setState(state => {
    state.readPretty = true;
  });
  expect(aa.pattern).toEqual("readPretty");

  aa.setState(state => {
    state.readPretty = false;
  });
  expect(aa.pattern).toEqual("editable");
  expect(aa.parent).toBeUndefined();
});

// 嵌套展示、嵌套模式
test("nested display/pattern", () => {
  const form = attach(createForm());
  attach(form.createObjectField({ name: "object" }));

  const void_ = attach(form.createVoidField({ basePath: "object", name: "void" }));
  const aaa = attach(form.createField({ basePath: "object.void", name: "aaa" }));
  const bbb = attach(form.createField({ basePath: "object.void", name: "bbb" }));
  const void2_ = attach(form.createVoidField({ basePath: "object.void.0", name: "void" }));

  void_.setPattern("readPretty");
  expect(void_.pattern).toEqual("readPretty");
  expect(aaa.pattern).toEqual("readPretty");
  expect(bbb.pattern).toEqual("readPretty");
  expect(void2_.pattern).toEqual("readPretty");

  void_.setPattern("readOnly");
  expect(void_.pattern).toEqual("readOnly");
  expect(aaa.pattern).toEqual("readOnly");
  expect(bbb.pattern).toEqual("readOnly");
  expect(void2_.pattern).toEqual("readOnly");

  void_.setPattern("disabled");
  expect(void_.pattern).toEqual("disabled");
  expect(aaa.pattern).toEqual("disabled");
  expect(bbb.pattern).toEqual("disabled");
  expect(void2_.pattern).toEqual("disabled");

  // 不提供参数默认为 editable
  void_.setPattern();
  expect(void_.pattern).toEqual("editable");
  expect(aaa.pattern).toEqual("editable");
  expect(bbb.pattern).toEqual("editable");
  expect(void2_.pattern).toEqual("editable");

  void_.setDisplay("hidden");
  expect(void_.display).toEqual("hidden");
  expect(aaa.display).toEqual("hidden");
  expect(bbb.display).toEqual("hidden");
  expect(void2_.display).toEqual("hidden");

  void_.setDisplay("none");
  expect(void_.display).toEqual("none");
  expect(aaa.display).toEqual("none");
  expect(bbb.display).toEqual("none");
  expect(void2_.display).toEqual("none");

  // 不提供参数默认为 visible
  void_.setDisplay();
  expect(void_.display).toEqual("visible");
  expect(aaa.display).toEqual("visible");
  expect(bbb.display).toEqual("visible");
  expect(void2_.display).toEqual("visible");

  // 卸载不影响字段节点关系
  void_.onUnmount();
  expect(void2_.parent).toBe(void_);
});

// 联动
test("reactions", async () => {
  const form = attach(createForm());
  const aa = attach(form.createField({ name: "aa" }));
  const bb = attach(
    form.createVoidField({
      name: "bb",
      reactions: [
        field => {
          const aa = field.query("aa");
          field.visible = aa.get("value") !== "123";

          const inputValue = aa.get("inputValue");
          if (inputValue === "333") {
            field.editable = false;
          } else if (inputValue === "444") {
            field.editable = true;
          }

          const initialValue = aa.get("initialValue");
          if (initialValue === "555") {
            field.readOnly = true;
          } else if (initialValue === "666") {
            field.readOnly = false;
          }
        },
      ],
    }),
  );

  expect(bb.visible).toBeTruthy();

  aa.setValue("123");
  expect(bb.visible).toBeFalsy();

  // 来看看个神奇的现象，上面设置了值 123，接着设置初始值会覆盖字段值
  aa.setInitialValue("555");
  expect(bb.readOnly).toBeTruthy();
  expect(aa.value).toEqual("555");

  aa.setInitialValue("666");
  expect(bb.readOnly).toBeFalsy();
  expect(aa.value).toEqual("666");

  // 为了不影响后续操作，这里临时改下初始值，同样它也影响了 value
  aa.setInitialValue("777");
  expect(aa.value).toEqual("777");

  // 再次输入值，输入的值会改变 value，但不改变 initialValue
  aa.onInput("333");
  expect(bb.editable).toBeFalsy();
  expect(aa.value).toEqual("333");
  expect(aa.initialValue).toEqual("777");

  aa.onInput("444");
  expect(bb.editable).toBeTruthy();
  expect(aa.value).toEqual("444");
  expect(aa.initialValue).toEqual("777");

  // 再次修改初始值，这个时候 value 没变，onInput 优先级最高
  // 但 initialValue 改变了，也因此在上下文顺序原因修改了展示状态
  aa.setInitialValue("555");
  expect(bb.readOnly).toBeTruthy();
  expect(bb.editable).toBeFalsy();
  expect(aa.value).toEqual("444");
  expect(aa.initialValue).toEqual("555");
});

// 容错
test("fault tolerance", () => {
  const form = attach(createForm());
  const field = attach(form.createVoidField({ name: "xxx" }));

  // @ts-ignore
  form.setDisplay(null);

  // @ts-ignore
  form.setPattern(null);

  expect(field.display).toEqual("visible");
  expect(field.pattern).toEqual("editable");
});

// 子集联动
test("child field reactions", () => {
  const form = attach(createForm());
  const voidField = attach(form.createVoidField({ name: "void" }));
  const field1 = attach(
    form.createField({
      name: "field1",
      basePath: voidField.address,
      reactions: [
        field => {
          // getIn 和 get 的区别在于它们接受的参数类型不一样
          field.value = field.query("field3").getIn("value");
        },
      ],
    }),
  );
  const field2 = attach(
    form.createField({
      name: "field2",
      basePath: voidField.address,
      reactions: [
        field => {
          // 这里采用点路径往上一级，由于上一级是虚拟路径，那么 .field3 和 field3 是一样的
          field.value = field.query(".field3").getIn("value");
        },
      ],
    }),
  );

  expect(field1.value).toBeUndefined();
  expect(field2.value).toBeUndefined();

  const field3 = attach(
    form.createField({
      basePath: voidField.address,
      name: "field3",
      value: 1,
    }),
  );

  expect(field1.value).toBe(1);
  expect(field2.value).toBe(1);

  field3.value = 2;
  expect(field1.value).toBe(2);
  expect(field2.value).toBe(2);
});
