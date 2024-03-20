import { FormItem, Input } from "@formily/antd-v5";
import { Field } from "@formily/react";
import { FC } from "react";

const CustomFormat: FC = () => (
    <>
        <Field
            name="global_style_1"
            title="全局注册风格"
            component={[Input]}
            decorator={[FormItem]}
            validator={{ format: "custom_format", message: "错误❎" }}
            required
        />
        <Field
            name="global_style_2"
            title="全局注册风格"
            component={[Input]}
            decorator={[FormItem]}
            validator="custom_format"
            required
        />
        <Field
            name="global_style_3"
            title="全局注册风格"
            component={[Input]}
            decorator={[FormItem]}
            validator={["custom_format"]}
            required
        />
        <Field
            name="global_style_4"
            title="全局注册风格"
            component={[Input]}
            decorator={[FormItem]}
            validator={[{ format: "custom_format", message: "错误❎" }]}
            required
        />
        <Field
            name="validator_style_1"
            title="局部定义风格"
            component={[Input]}
            decorator={[FormItem]}
            validator={{ message: "错误❎", pattern: /123/ }}
            required
        />
        <Field
            name="validator_style_2"
            title="局部定义风格"
            component={[Input]}
            decorator={[FormItem]}
            validator={[{ message: "错误❎", pattern: "123" }]}
            required
        />
    </>
);

export default CustomFormat;
