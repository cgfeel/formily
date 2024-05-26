import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";
import { FormConsumer } from "@formily/react";

const form = createForm({
    initialValues: {
        search: {
            ops: "and",
            children: [
                { key: "key1", op: ">", value: "0" },
                {
                    ops: "or",
                    children: [
                        { key: "key2", op: "<", value: "20" },
                        { key: "key3", op: ">", value: "10" },
                    ],
                },
            ],
        },
    },
});

const ObjectBaseExample: FC = () => (
    <Panel
        footer={
            <div>
                <p>
                    来自群友的提问，复现掘金 <code>DMS</code> 案例 [
                    <a href="https://juejin.cn/post/7005869798483558431">查看</a>]
                </p>
                <p>优点：</p>
                <ul>
                    <li>简洁，总共就 2 文件</li>
                    <li>一套模型下，在不修改任何代码，可以无限自定义逻辑渲染</li>
                </ul>
            </div>
        }
        form={form}
        header={<h2>定义一个折叠查询 - 完整示例</h2>}>
        <SchemaField>
            <SchemaField.Object name="search" x-component="ObjectCollapse">
                <SchemaField.String
                    x-component="ObjectCollapse.Options"
                    enum={[
                        { value: "and", label: "且" },
                        { value: "or", label: "或" },
                    ]}
                />
                <SchemaField.Object x-component="ObjectCollapse.CollapsePanel">
                    <SchemaField.Void x-component="Space">
                        <SchemaField.String name="key" x-component="Input" x-decorator="FormItem" />
                        <SchemaField.String
                            name="op"
                            x-component="Select"
                            x-decorator="FormItem"
                            enum={[
                                { value: ">", label: "大于" },
                                { value: "<", label: "小于" },
                            ]}
                        />
                        <SchemaField.String name="value" x-component="Input" x-decorator="FormItem" />
                    </SchemaField.Void>
                </SchemaField.Object>
                <SchemaField.Void x-component="ObjectCollapse.Remove" />
                <SchemaField.Void x-component="ObjectCollapse.Addition" x-decorator="FormItem" />
            </SchemaField.Object>
        </SchemaField>
        <code className="consumer">
            <pre>
                <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
            </pre>
        </code>
    </Panel>
);

export default ObjectBaseExample;
