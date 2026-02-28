import { autorun, observable } from "@formily/reactive";
import { FieldType, validate } from "./Context";
import FormItem from "./FormItem";
import Input from "./Input";
import InputDigit from "./InputDigit";
import Label from "./Label";
import Password from "./Password";

const requireValidator = (data: any): string => {
  if (typeof data === "string") {
    return data === "" ? "缺少参数" : "";
  }
  return data === void 0 ? "缺少参数" : "";
};

const data = observable<Record<string, FieldType>>({
  name: {
    component: Input,
    componentProps: {
      placeholder: "你是谁",
    },
    decorator: FormItem,
    decoratorProps: {},
    errors: [],
    title: "姓名",
    validator: [requireValidator],
    value: "",
    visible: true,
    onInput(event) {
      if ("value" in event.target) {
        data.name.value = event.target.value;
        data.name.errors = validate(data.name.value, data.name.validator);
      }
    },
  },
  nameLength: {
    component: Label,
    componentProps: {
      disabled: true,
    },
    decorator: FormItem,
    decoratorProps: {
      style: { height: 20 },
    },
    errors: [],
    title: "名字长度",
    validator: [requireValidator],
    value: 0,
    visible: true,
    onInput() {},
  },
  age: {
    component: InputDigit,
    componentProps: {},
    decorator: FormItem,
    decoratorProps: {
      style: { height: 20 },
    },
    errors: [],
    title: "年龄",
    validator: [requireValidator],
    value: void 0,
    visible: true,
    onInput(event) {
      if ("value" in event.target) {
        data.age.value = event.target.value;
        data.age.errors = validate(data.age.value, data.age.validator);
      }
    },
  },
  password: {
    component: Password,
    componentProps: {},
    decorator: FormItem,
    decoratorProps: {},
    errors: [],
    title: "密码",
    validator: [requireValidator],
    value: void 0,
    visible: true,
    onInput(event) {
      if ("value" in event.target) {
        data.password.value = event.target.value;
        data.password.errors = validate(data.password.value, data.password.validator);
      }
    },
  },
});

autorun(() => (data.nameLength.value = data.name.value.length));

export { data };
