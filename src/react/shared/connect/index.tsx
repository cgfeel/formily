import { IFieldProps } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import Wraper, { WraperProps } from "../../hooks/useField/Wraper";
import FormItem from "./FormItem";
import Input from "./Input";

const Connect: FC<ConnectProps> = ({ footer, form, header, ...props }) => (
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
    extends Pick<WraperProps, "footer" | "form" | "header">,
        Pick<IFieldProps, "initialValue" | "pattern"> {}

export default Connect;
