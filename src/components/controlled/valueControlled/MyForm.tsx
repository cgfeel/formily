import { Form } from "@formily/antd-v5";
import { createForm, onFormValuesChange } from "@formily/core";
import { FC, ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import SchemaField from "../SchemaField";

const MyFormInternal = <T extends FormType = FormType>(
    { defaultValue, value, onChange }: MyFormProps<T>,
    ref: ForwardedRef<MyFormInstance<T>>,
) => {
    const [defaultValueData] = useState(value || defaultValue);
    const form = useRef(
        createForm<T>({
            ...(defaultValueData === void 0 ? {} : { values: defaultValueData }),
            effects: () => {
                onFormValuesChange(form => onChange && onChange(form.values));
            },
        }),
    );

    const data = value === void 0 ? value : JSON.stringify(value);
    useEffect(() => {
        // 第二个参数见：https://core.formilyjs.org/zh-CN/api/models/form#iformmergestrategy
        data !== void 0 && form.current.setValues(JSON.parse(data), "overwrite");
    }, [form, data]);

    useImperativeHandle(ref, () => ({
        update: values => form.current.setValues(values, "overwrite"),
    }));

    const count = useRef(1);
    return (
        <Form form={form.current}>
            <SchemaField>
                <SchemaField.String
                    name="input"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-component-props={{ placeholder: "受控者" }}
                />
            </SchemaField>
            Form 组件渲染次数：{count.current++}
        </Form>
    );
};

const MyForm: ForwardMyForm = forwardRef(MyFormInternal);

if (process.env.NODE_ENV !== "production") {
    MyForm.displayName = "MyForm";
}

interface ForwardMyForm extends FC<MyFormProps<FormType>> {
    <T extends FormType, P = MyFormProps<T>>(props: P & { ref?: ForwardedRef<MyFormInstance<T>> }): ReturnType<FC<P>>;
}

export interface MyFormInstance<T extends FormType = FormType> {
    update: (value: T) => void;
}

export interface MyFormProps<T extends FormType> {
    defaultValue?: T;
    value?: T;
    onChange?: (value: T) => void;
}

export default MyForm;
