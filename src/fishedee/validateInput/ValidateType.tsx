import { createForm, onFormInit } from "@formily/core";
import { FC } from "react";
import Wrapper from "../fieldAction/Wrapper";
import Field from "./Field";

const validator = (value?: string) => {
    return value === "123" ? "" : "输入的值必须是 123";
};

const form = createForm({
    effects: () => {
        onFormInit(form => {
            form.createField({ name: "onfocus", required: true, validator: [{ triggerType: "onFocus", validator }] });
            form.createField({ name: "onblur", required: true, validator: [{ triggerType: "onBlur", validator }] });
            form.createField({ name: "onInput", required: true, validator });
        });
    },
});

const ValidateInput: FC = () => (
    <Wrapper
        footer={
            <p>
                这里主要演示 <code>core</code> 验证方式，模拟的表单字段，而并非是用 <code>@formily/react</code> 和{" "}
                <code>schema</code>，这部分内容会在后面的章节演示
            </p>
        }
        form={form}
        header={<h2>core.3.1.2 onBlur与onFocus触发</h2>}>
        <Field field={form.query("onfocus").take()} />
        <Field field={form.query("onblur").take()} />
        <Field field={form.query("onInput").take()} />
    </Wrapper>
);

export default ValidateInput;
