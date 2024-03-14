import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Pannel, { field } from "./Pannel";
import SchemaField from "./SchemaField";

const form = createForm();

const schema: ISchema = {
    type: "object",
    properties: {
        grid: {
            type: "void",
            "x-component": "FormGrid",
            properties: field.reduce<Exclude<ISchema["properties"], string>>(
                (current, key) => ({
                    ...current,
                    [key.repeat(3)]: {
                        title: key.repeat(3).toUpperCase(),
                        type: "string",
                        "x-component": "Input",
                        "x-decorator": "FormItem",
                    },
                }),
                {},
            ),
            "x-component-props": {
                breakpoints: [640, 960, 1200],
                maxColumns: [4, 6, 10],
                minColumns: [2, 5, 8],
            },
        },
    },
};

const Json: FC = () => (
    <Pannel
        footer={
            <div>
                <p>
                    <code>breakpoints</code>：容器断点，每个节点触发响应
                </p>
                <p>
                    <code>maxColumns</code>：每个断点最大的网格数
                </p>
                <p>
                    <code>minColumns</code>：每个断点最少的网格数
                </p>
            </div>
        }
        form={form}
        header={
            <h2>
                通过<code>Json Schema</code>实现网格布局
            </h2>
        }>
        <SchemaField schema={schema}></SchemaField>
    </Pannel>
);

export default Json;
