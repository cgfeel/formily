import { Form } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { FC, useRef } from "react";
import SchemaFiled from "../SchemaField";

const MyForm: FC<MyFormProps> = ({ values }) => {
    const count = useRef(1);
    const form = useRef(createForm({ values }));
    return (
        <Form form={form.current}>
            <SchemaFiled>
                <SchemaFiled.String
                    name="input"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-component-props={{ placeholder: "受控者" }}
                />
            </SchemaFiled>
            Form 组件渲染次数：{count.current++}
        </Form>
    );
};

export interface MyFormProps {
    values: FormType;
}

export default MyForm;
