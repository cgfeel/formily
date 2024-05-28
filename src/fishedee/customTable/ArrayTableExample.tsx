import { createForm } from "@formily/core";
import { FC } from "react";
import Wrapper from "../fieldAction/Wrapper";
import SchemaField from "./SchemaField";
import { FormConsumer } from "@formily/react";

const form = createForm({
    initialValues: {
        data: [
            { name: "小新", age: 5 },
            { name: "广志", age: 32 },
            { name: "美伢", age: 29 },
        ],
    },
});

const ArrayTableExample: FC = () => (
    <Wrapper form={form}>
        <SchemaField>
            <SchemaField.Array name="data" x-component="ArrayField">
                <SchemaField.Object>
                    <SchemaField.Void title="姓名" x-component="ArrayField.Column">
                        <SchemaField.String name="name" x-component="Input" />
                    </SchemaField.Void>
                    <SchemaField.Void title="年龄" x-component="ArrayField.Column">
                        <SchemaField.String name="age" x-component="NumberPicker" />
                    </SchemaField.Void>
                </SchemaField.Object>
                <SchemaField.Void title="添加条目" x-component="ArrayField.Addition" />
            </SchemaField.Array>
        </SchemaField>
        <code className="consumer">
            <pre>
                <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
            </pre>
        </code>
    </Wrapper>
);

export default ArrayTableExample;
