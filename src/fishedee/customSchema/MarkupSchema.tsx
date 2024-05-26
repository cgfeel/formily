import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import { FormConsumer, FormProvider } from "../customField/Context";
import SchemaField from "./SchemaField";

const form = createForm({
    initialValues: {
        person: {
            name: "levi",
            age: 12,
        },
        contact: [
            {
                phone: "1234567890123",
                mail: "11@22.com",
            },
        ],
    },
});

const MarkupSchema: FC = () => (
    <Panel
        footer={
            <div>
                <p>
                    完全按照 <code>formily</code> 来优化：
                </p>
                <ul>
                    <li>
                        将 <code>schema</code> 不同的渲染方式，用一套逻辑实现。没有像文档那样分成两套实现{" "}
                        <code>JsonSchema</code> 和 <code>MarkupSchema</code>
                    </li>
                    <li>
                        对于模型字段创建通过 <code>createSchemaField</code> 实现，而不是分为两个组件实现
                    </li>
                </ul>
                <p>
                    渲染逻辑（和 <code>JsonSchema</code> 一样）：
                </p>
                <ul>
                    <li>
                        通过上下文 <code>SchemaContext.Provider</code> 不断递归更新，用到了 <code>object</code>{" "}
                        对象引用地址一致的特性
                    </li>
                    <li>
                        然后将更新的 <code>context</code> 共享{" "}
                        <code>{"<RecursionField schema={baseSchema} onlyRenderProperties />"}</code>
                    </li>
                    <li>
                        之后的过程就可以直接参考 <code>JsonSchema</code> 渲染原理
                    </li>
                </ul>
                <p>备注：</p>
                <ul>
                    <li>
                        对于 <code>type</code> 为 <code>array</code> 的 <code>items</code>、<code>properties</code>{" "}
                        的提取和文档稍有不同，因为发现文档示例在 <code>context</code> 更新过程中，存在丢失的情况
                    </li>
                    <li>
                        对于表单的实现，从 <code>Reactive</code> 到 <code>schema</code> 是层层递进的，建议看看
                    </li>
                </ul>
            </div>
        }
        header={<h2>Core4.2: 复现 JsonSchema</h2>}>
        <FormProvider form={form}>
            <SchemaField>
                <SchemaField.Object name="person" title="个人信息" x-decorator="VoidComponent">
                    <SchemaField.String
                        name="name"
                        title="姓名"
                        x-component="Input"
                        x-decorator="FormItem"
                        x-component-props={{ placeholder: "please input" }}
                        required
                    />
                    <SchemaField.String
                        name="age"
                        title="年龄"
                        x-component="InputDigit"
                        x-decorator="FormItem"
                        x-component-props={{ placeholder: "please input" }}
                        required
                    />
                </SchemaField.Object>
                <SchemaField.Array name="contact" title="联系信息" x-component="ArrayItem" x-decorator="VoidComponent">
                    <SchemaField.Object title="信息" x-decorator="FormItem">
                        <SchemaField.String
                            format="phone"
                            name="phone"
                            x-component="Input"
                            x-decorator="FormItem"
                            x-component-props={{ placeholder: "please input" }}
                            required
                        />
                        <SchemaField.String
                            format="email"
                            name="mail"
                            x-component="Input"
                            x-decorator="FormItem"
                            x-component-props={{ placeholder: "please input" }}
                            required
                        />
                    </SchemaField.Object>
                    <SchemaField.String
                        format="email"
                        name="mail"
                        x-component="Input"
                        x-decorator="FormItem"
                        x-component-props={{ placeholder: "please input" }}
                        required
                    />
                </SchemaField.Array>
            </SchemaField>
            <code className="consumer">
                <pre>
                    <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
                </pre>
            </code>
        </FormProvider>
    </Panel>
);

export default MarkupSchema;
