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

const NoAction: FC = () => (
    <Panel form={form} header={<h2>定义一个折叠查询 - 不要所有操作</h2>}>
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
            </SchemaField.Object>
        </SchemaField>
        <code className="consumer">
            <pre>
                <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
            </pre>
        </code>
    </Panel>
);

export default NoAction;
