import { FC, PropsWithChildren } from "react";
import SchemaField from "../../SchemaField";

const CustomFormat: FC<PropsWithChildren> = ({ children }) => (
    <SchemaField>
        <SchemaField.String
            name="global_style_1"
            title="全局注册风格"
            x-component="Input"
            x-decorator="FormItem"
            x-validator={{
                format: "custom_format",
                message: "错误❎",
            }}
            required
        />
        <SchemaField.String
            name="global_style_2"
            title="全局注册风格"
            x-component="Input"
            x-decorator="FormItem"
            x-validator={"custom_format"}
            required
        />
        <SchemaField.String
            name="global_style_3"
            title="全局注册风格"
            x-component="Input"
            x-decorator="FormItem"
            x-validator={["custom_format"]}
            required
        />
        <SchemaField.String
            name="global_style_4"
            title="全局注册风格"
            x-component="Input"
            x-decorator="FormItem"
            x-validator={[
                {
                    format: "custom_format",
                    message: "错误❎",
                },
            ]}
            required
        />
        <SchemaField.String
            format="custom_format"
            name="global_style_5"
            title="全局注册风格"
            x-component="Input"
            x-decorator="FormItem"
            required
        />
        <SchemaField.String
            name="validator_style_1"
            title="局部定义风格"
            x-component="Input"
            x-decorator="FormItem"
            pattern={/123/}
            required
        />
        <SchemaField.String
            name="validator_style_2"
            title="局部定义风格"
            x-component="Input"
            x-decorator="FormItem"
            pattern="123"
            required
        />
        <SchemaField.String
            name="validator_style_3"
            title="局部定义风格"
            x-component="Input"
            x-decorator="FormItem"
            x-validator={{
                message: "错误❎",
                pattern: /123/,
            }}
            required
        />
        <SchemaField.String
            name="validator_style_4"
            title="局部定义风格"
            x-component="Input"
            x-decorator="FormItem"
            x-validator={[
                {
                    message: "错误❎",
                    pattern: "123",
                },
            ]}
            required
        />
        {children}
    </SchemaField>
);

export default CustomFormat;
