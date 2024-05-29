import { Field, createForm } from "@formily/core";
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
    <Wrapper form={form} header={<h2>Core.6.4-6.7: ArrayTable 列表组件</h2>}>
        <SchemaField scope={{ test: (field: Field) => console.log(field.path.toString()) }}>
            <SchemaField.Array name="data" x-component="ArrayField">
                <SchemaField.Object>
                    <SchemaField.Void
                        title="姓名"
                        x-component="ArrayField.Column"
                        x-reactions={{
                            dependencies: ["data"],
                            fulfill: {
                                schema: {
                                    "x-component-props.title": "{{'姓名：' + $deps[0].length + '行'}}",
                                },
                            },
                        }}>
                        <SchemaField.String name="name" x-component="Input" />
                    </SchemaField.Void>
                    <SchemaField.Void title="年龄" x-component="ArrayField.Column">
                        <SchemaField.String name="age" x-component="NumberPicker" />
                    </SchemaField.Void>
                    <SchemaField.Void title=" 姓名长度" x-component="ArrayField.Column">
                        <SchemaField.String
                            name="name-length"
                            x-component="Input"
                            x-pattern="readPretty"
                            x-reactions={{
                                dependencies: [".name"],
                                fulfill: {
                                    state: { value: "{{$deps[0]?.length||0}}" },
                                },
                            }}
                        />
                    </SchemaField.Void>
                    <SchemaField.Void title="操作" x-component="ArrayField.Column">
                        <SchemaField.Void x-component="ArrayField.Remove" />
                        <SchemaField.Void x-component="ArrayField.MoveDown" />
                        <SchemaField.Void x-component="ArrayField.MoveUp" />
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
