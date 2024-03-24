// import { FormTab } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Pannel, { tabList } from "./Pannel";
import FormTab from "./form-tab";
import SchemaField from "./SchemaField";

const form = createForm();
const formTab = FormTab.createFormTab();

const schema: ISchema = {
    type: "object",
    properties: {
        tabs: {
            type: "void",
            "x-component": "FormTab",
            properties: tabList.reduce<Exclude<ISchema["properties"], string>>(
                (current, { input, name, tab }) => ({
                    ...current,
                    [name]: {
                        type: "void",
                        "x-component": "FormTab.TabPane",
                        properties: {
                            [input]: {
                                required: true,
                                title: input.toUpperCase(),
                                type: "string",
                                "x-component": "Input",
                                "x-decorator": "FormItem",
                            },
                        },
                        "x-component-props": { key: tab, tab },
                    },
                }),
                {},
            ),
            "x-component-props": {
                formTab: "{{formTab}}",
            },
        },
    },
};

const JsonSchema: FC = () => (
    <Pannel
        footer={
            <div>
                <p>
                    巩固：<code>Json Schema</code> 中，对于需要为 <code>props</code> 传递上下文的情况，可以通过{" "}
                    <code>scope</code> 动态添加上下文对象
                </p>
                <p>补充：</p>
                <ul>
                    <li>
                        每项选项卡使用 <code>key</code> 作为 选项关键词，而非文档示例中的 <code>tab</code>，
                        <code>antd v5</code> 已调整API
                    </li>
                    <li>
                        在 <code>Tabs</code> 中，由于不需要在字段外实时消费状态即可触发交互动作，所以这里不需要消费{" "}
                        <code>FormConsumer</code>
                    </li>
                </ul>
            </div>
        }
        form={form}
        formTab={formTab}
        header={
            <h2>
                通过<code>Json Schema</code>创建选项卡表单
            </h2>
        }>
        <SchemaField schema={schema} scope={{ formTab }} />
    </Pannel>
);

export default JsonSchema;
