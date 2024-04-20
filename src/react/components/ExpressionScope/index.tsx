import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../../Panel";
import SchemaField from "./SchemaField";

const form = createForm();

const ExpressionScope: FC = () => (
    <Panel
        footer={
            <div>
                <p>
                    用于自定义组件内部给 <code>json-schema</code> 表达式传递局部作用域，使用时不需要包裹{" "}
                    <code>observer</code>
                </p>
            </div>
        }
        form={form}
        header={
            <h2>
                <code>ExpressionScope</code>
            </h2>
        }>
        <SchemaField>
            <SchemaField.Void x-component="Container">
                <SchemaField.String
                    default="{{$innerScope}}"
                    name="input"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-component-props={{ allowClear: true }}
                />
            </SchemaField.Void>
        </SchemaField>
    </Panel>
);

export default ExpressionScope;
