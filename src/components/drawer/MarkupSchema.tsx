import { FC } from "react";
import Pannel, { buttonClick, fieldKeys } from "./Pannel";
import SchemaField from "./SchemaField";

const MarkupInner: FC = () => (
    <SchemaField>
        {fieldKeys.map((key, i) => (
            <SchemaField.String
                x-component="Input"
                x-decorator="FormItem"
                key={key}
                name={key}
                title={`输入框${i + 1}`}
                required
            />
        ))}
    </SchemaField>
);

const MarkupSchema: FC = () => (
    <Pannel
        footer={
            <p>
                无论是<code>FormDialog</code>还是<code>FormDrawer</code>都会随表单实时响应，为了提高性能建议将
                <code>Schema</code>或<code>Field</code> 组件从方法中抽离出来，以<code>props</code>的方式传入
            </p>
        }
        header={
            <h2>
                通过<code>Markup Schema</code>创建抽屉表单
            </h2>
        }
        onClick={() => buttonClick(<MarkupInner />, { [fieldKeys[0]]: "123" })}
    />
);

export default MarkupSchema;
