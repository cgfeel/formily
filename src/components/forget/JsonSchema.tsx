import { createForm } from "@formily/core";
import { ISchema } from "@formily/json-schema";
import { FC } from "react";
import Pannel from "../register/components/Pannel";
import SchemaField from "./SchemaField";

const form = createForm({
    validateFirst: true,
});

const schema: ISchema = {
    type: "object",
    properties: {
        username: {
            required: true,
            title: "用户名",
            type: "string",
            "x-component": "Input",
            "x-decorator": "FormItem",
        },
        email: {
            required: true,
            title: "邮箱",
            type: "string",
            "x-component": "Input",
            "x-decorator": "FormItem",
            "x-validator": "email",
        },
        old_password: {
            required: true,
            title: "原始密码",
            type: "string",
            "x-component": "Password",
            "x-decorator": "FormItem",
            "x-component-props": {
                autoComplete: "off",
            },
        },
        password: {
            required: true,
            title: "新密码",
            type: "string",
            "x-component": "Password",
            "x-decorator": "FormItem",
            "x-component-props": {
                autoComplete: "off",
                checkStrength: true,
            },
            "x-reactions": [
                {
                    dependencies: [".confirm_password"],
                    fulfill: {
                        state: {
                            selfErrors:
                                "{{$deps[0] && $self.value && $deps[0] !== $self.value ? ['确认密码不匹配'] : []}}",
                        },
                    },
                },
            ],
        },
        confirm_password: {
            required: true,
            title: "确认密码",
            type: "string",
            "x-component": "Password",
            "x-decorator": "FormItem",
            "x-component-props": {
                autoComplete: "off",
                checkStrength: true,
            },
            "x-reactions": [
                {
                    dependencies: [".password"],
                    fulfill: {
                        state: {
                            selfErrors:
                                "{{$deps[0] && $self.value && $deps[0] !== $self.value ? ['确认密码不匹配'] : []}}",
                        },
                    },
                },
            ],
        },
    },
};

const JsonSchema: FC = () => (
    <Pannel
        submit="确认变更"
        footer={
            <p>
                在 <code>Json Schema</code> 中，表单项的 <code>name</code> 跟随Json的 <code>key</code>，如果{" "}
                <code>name</code> 带有<code>-</code> 可以通过添加引号，如：<code>{'"old-password": {}'}</code>
            </p>
        }
        form={form}
        header={
            <h2>
                通过<code>Json Schema</code>修改密码
            </h2>
        }>
        <SchemaField schema={schema} />
    </Pannel>
);

export default JsonSchema;
