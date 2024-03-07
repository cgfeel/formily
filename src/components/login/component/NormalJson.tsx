import { createForm } from "@formily/core";
import { ISchema } from "@formily/json-schema";
import { FC } from "react";
import SchemaField from "../SchemaField";
import FormCom from "./FormCom";

const form = createForm({
    validateFirst: true,
});

/**
 * JSON Schema
 *  - `type`为`string`对照组件`NormalMarkup`备注
 *  - `type`为`Object`作为`ObjectField`，有一个属性`properties`用于存放子节点
 *  - 优点：可由后端直接提供UI规则、交互规则、校验规则
 */
const normalSchema: ISchema = {
    type: "object",
    properties: {
        username: {
            required: true,
            title: "用户名",
            type: "string",
            "x-component": "Input",
            "x-decorator": "FormItem",
            "x-component-props": {
                prefix: "{{icon('user')}}",
            },
        },
        password: {
            required: true,
            title: "密码",
            type: "string",
            "x-component": "Password",
            "x-decorator": "FormItem",
            "x-component-props": {
                prefix: "{{icon('pwd')}}",
            },
        },
    },
};

const NormalJson: FC = () => (
    <FormCom form={form}>
        <SchemaField schema={normalSchema} />
    </FormCom>
);

export default NormalJson;
