import { createForm } from "@formily/core";
import { FormConsumer } from "@formily/react";
import { FC } from "react";
import Wrapper from "../../fieldAction/Wrapper";
import SchemaField from "./SchemaField";

const form = createForm();

const ArrayReaction: FC = () => (
    <Wrapper form={form}>
        <SchemaField>
            <SchemaField.Array name="array" title="最多添加 3 项" x-component="ArrayCards">
                <SchemaField.Object
                    title="请填写"
                    x-component="VoidComponent"
                    x-reactions={{
                        dependencies: [".[].input"],
                        when: "{{$deps[0] !== '123'}}",
                        fulfill: {
                            state: { title: "寻常的标题" },
                        },
                        otherwise: {
                            state: { title: "我是 123 时候的标题" },
                        },
                    }}>
                    <SchemaField.String name="title" title="标题" x-component="Input" x-decorator="FormItem" required />
                    <SchemaField.String
                        description="输入 123"
                        name="input"
                        title="输入框"
                        x-component="Input"
                        x-decorator="FormItem"
                        required
                    />
                    <SchemaField.Void x-component="ArrayCards.Index" />
                    <SchemaField.Void x-component="ArrayCards.Remove" />
                    <SchemaField.Void x-component="ArrayCards.MoveUp" />
                    <SchemaField.Void x-component="ArrayCards.MoveDown" />
                </SchemaField.Object>
                <SchemaField.Void
                    title="添加条目"
                    x-component="ArrayCards.Addition"
                    x-reactions={{
                        dependencies: ["array"],
                        fulfill: {
                            state: { visible: "{{$deps[0].length < 3}}" },
                        },
                    }}></SchemaField.Void>
            </SchemaField.Array>
        </SchemaField>
        <code className="consumer">
            <pre>
                <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
            </pre>
        </code>
    </Wrapper>
);

export default ArrayReaction;
