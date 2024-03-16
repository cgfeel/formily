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
        header={
            <h2>
                通过<code>Markup Schema</code>创建弹窗表单
            </h2>
        }
        onClick={() => buttonClick(<MarkupInner />, { [fieldKeys[0]]: "123" })}
    />
);

export default MarkupSchema;
