import { FC } from "react";
import Panel from "./Panel";
import { createForm, onFormMount } from "@formily/core";
import SchemaField from "./SchemaField";
import { Input } from "@formily/antd-v5";
import FormItem from "../../components/formItem/form-item";

const form = createForm({
    effects: () => {
        onFormMount(() => {
            form.createField({
                name: "input",
                required: true,
                title: "createField",
                component: [Input, { allowClear: true }],
                decorator: [FormItem],
            });
        });
    },
});

const CoreForm: FC = () => (
    <Panel form={form}>
        <SchemaField></SchemaField>
    </Panel>
);

export default CoreForm;
