import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import { Field } from "@formily/react";
import { Input } from "@formily/antd-v5";

const form = createForm();

const FieldCom: FC = () => (
    <Panel form={form}>
        <Field name="input" component={[Input, { placeholder: "Please Input" }]} />
    </Panel>
);

export default FieldCom;
