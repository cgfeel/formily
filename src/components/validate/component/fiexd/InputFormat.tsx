import { FormItem, Input } from "@formily/antd-v5";
import { Field } from "@formily/react";
import { FC } from "react";

const InputFormat: FC<InputFormatProps> = ({ format }) => (
    <>
        <Field
            component={[Input]}
            decorator={[FormItem]}
            name={`${format}_1`}
            title={`${format}格式1`}
            validator={format}
            required
        />
        <Field
            component={[Input]}
            decorator={[FormItem]}
            name={`${format}_2`}
            title={`${format}格式2`}
            validator={{ format }}
            required
        />
        <Field
            component={[Input]}
            decorator={[FormItem]}
            name={`${format}_3`}
            title={`${format}格式3`}
            validator={[format]}
            required
        />
        <Field
            component={[Input]}
            decorator={[FormItem]}
            name={`${format}_4`}
            title={`${format}格式4`}
            validator={[{ format }]}
            required
        />
    </>
);

export interface InputFormatProps {
    format: string;
}

export default InputFormat;
