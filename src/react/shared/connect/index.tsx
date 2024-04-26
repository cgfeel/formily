import { IFieldProps, createForm } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import Wraper, { WraperProps } from "../../hooks/useField/Wraper";
import FormItem from "./FormItem";
import Input from "./Input";

const form = createForm();

const Connect: FC<ConnectProps> = ({ footer, header, ...props }) => (
    <Wraper footer={footer} form={form} header={header}>
        <Field
            {...props}
            name="name"
            title="Name"
            component={[Input, { placeholder: "Please Input" }]}
            decorator={[FormItem]}
            required
        />
    </Wraper>
);

export interface ConnectProps
    extends Pick<WraperProps, "footer" | "header">,
        Pick<IFieldProps, "initialValue" | "pattern"> {}

export default Connect;
