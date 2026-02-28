import {
  createForm,
  onFormInit,
  registerValidateFormats,
  registerValidateRules,
} from "@formily/core";
import { FC } from "react";
import Wrapper from "../fieldAction/Wrapper";
import Field from "./Field";

registerValidateFormats({
  myFormat: /123/,
});

registerValidateRules({
  GlobalPropertyFormat(value) {
    if (!value) return "";
    return value !== "123" ? "请输入123❎" : "";
  },
});

const form = createForm({
  effects: () => {
    onFormInit(form => {
      form.createField({ name: "minimum", validator: [{ minimum: 5, required: true }] });
      form.createField({ name: "min", validator: [{ min: 5, required: true }] });
      form.createField({
        name: "custom",
        validator: [{ GlobalPropertyFormat: true, required: true }],
      });
      form.createField({ name: "phone", validator: [{ format: "phone", required: true }] });
      form.createField({ name: "email", validator: [{ format: "email", required: true }] });
      form.createField({
        name: "myformat",
        validator: [{ format: "myFormat", message: "要有 123", required: true }],
      });
      form.createField({
        name: "validator",
        validator: [{ required: true, validator: value => (value !== "123" ? "只能 123" : "") }],
      });
      form.createField({
        name: "asnyc",
        validator: [
          {
            required: true,
            validator: value =>
              new Promise(resolve => {
                setTimeout(() => resolve(value === "123" ? "" : "必须 123"), 1000);
              }),
          },
        ],
      });
      form.createField({
        name: "combian",
        validator: [
          { required: true },
          { format: "email" },
          {
            validator: value => {
              const mail = String(value);
              return mail.startsWith("fish@") === false ? "只支持 fish 的发件人" : "";
            },
          },
        ],
      });
    });
  },
});

const Rule: FC = () => (
  <Wrapper
    footer={
      <p>
        这里主要演示 <code>core</code> 验证方式，模拟的表单字段，而并非是用{" "}
        <code>@formily/react</code> 和 <code>schema</code>，这部分内容会在后面的章节演示
      </p>
    }
    form={form}
    header={<h2>core.3.2.1-3.27: 规则校验</h2>}
  >
    <Field type="number" field={form.query("minimum").take()} />
    <Field field={form.query("min").take()} />
    <Field field={form.query("custom").take()} />
    <Field field={form.query("phone").take()} />
    <Field field={form.query("email").take()} />
    <Field field={form.query("myformat").take()} />
    <Field field={form.query("validator").take()} />
    <Field field={form.query("asnyc").take()} />
    <Field field={form.query("combian").take()} />
  </Wrapper>
);

export default Rule;
