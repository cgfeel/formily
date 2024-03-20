import { FC } from "react";
import SchemaField from "../../SchemaField";

const InputNumberRule: FC = () => (
    <>
        <SchemaField.String
            name="whitespace"
            title="排除纯空白字符"
            x-component="Input"
            x-decorator="FormItem"
            x-validator={[{ whitespace: true }]}
            required
        />
        <SchemaField.String
            name="enum"
            title="枚举匹配"
            x-component="Input"
            x-decorator="FormItem"
            x-validator={[{ enum: ["1", "2", "3"] }]}
            required
        />
        <SchemaField.String
            const="123"
            name="const"
            title="常量匹配"
            x-component="Input"
            x-decorator="FormItem"
            required
        />
        <SchemaField.Number
            multipleOf={2}
            name="multipleof"
            title="整除匹配"
            x-component="NumberPicker"
            x-decorator="FormItem"
            required
        />
    </>
);

export default InputNumberRule;
