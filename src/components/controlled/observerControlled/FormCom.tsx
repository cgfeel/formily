import { Form as FormType } from "@formily/core";
import { FC, PropsWithChildren } from "react";
import Form from "../../form/form";
import SchemaFiled from "../SchemaField";

const FormCom: FC<PropsWithChildren<FromComProps>> = ({ children, form }) => (
    <Form form={form}>
        <SchemaFiled>
            <SchemaFiled.String
                name="input"
                x-component="Input"
                x-decorator="FormItem"
                x-component-props={{ placeholder: "受控者" }}
            />
        </SchemaFiled>
        {children}
    </Form>
);

export interface FromComProps {
    form: FormType;
}

export default FormCom;
