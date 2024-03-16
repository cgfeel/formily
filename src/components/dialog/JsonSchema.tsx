import { ISchema } from "@formily/react";
import { FC } from "react";
import Pannel, { buttonClick, fieldKeys } from "./Pannel";
import SchemaField from "./SchemaField";

const schema: ISchema = {
    type: "object",
    properties: fieldKeys.reduce<Exclude<ISchema["properties"], string>>(
        (current, key, i) => ({
            ...current,
            [key]: {
                required: true,
                type: "string",
                "x-component": "Input",
                "x-decorator": "FormItem",
                title: `输入框${i + 1}`,
            },
        }),
        {},
    ),
};

const JsonSchema: FC = () => (
    <Pannel
        header={
            <h2>
                通过<code>Json Schema</code>创建弹窗表单
            </h2>
        }
        onClick={() => buttonClick(<SchemaField schema={schema} />, { [fieldKeys[0]]: "456" })}
    />
);

export default JsonSchema;
