import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Pannel, { tabList } from "./Pannel";
import FormCollapse from "./form-collapse";
import SchemaField from "./SchemaField";

const form = createForm();
const formCollapse = FormCollapse.createFormCollapse();

const shcema: ISchema = {
    type: "void",
    properties: {
        collapse: {
            title: "折叠面板",
            type: "void",
            "x-component": "FormCollapse",
            "x-decorator": "FormItem",
            "x-component-props": {
                formCollapse: "{{formCollapse}}",
            },
            properties: tabList.reduce<Exclude<ISchema["properties"], string>>(
                (current, { input, name, tab }) => ({
                    ...current,
                    [name]: {
                        type: "void",
                        "x-component": "FormCollapse.CollapsePanel",
                        "x-component-props": { key: tab, header: tab },
                        properties: {
                            [input]: {
                                required: true,
                                title: input.toUpperCase(),
                                type: "string",
                                "x-component": "Input",
                                "x-decorator": "FormItem",
                            },
                        },
                    },
                }),
                {},
            ),
        },
    },
};

const JsonSchema: FC = () => (
    <Pannel
        form={form}
        formCollapse={formCollapse}
        header={
            <h2>
                通过<code>Json Schema</code>创建折叠表单
            </h2>
        }>
        <SchemaField schema={shcema} scope={{ formCollapse }} />
    </Pannel>
);

export default JsonSchema;
