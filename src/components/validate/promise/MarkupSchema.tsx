import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import { validateRules } from "../data/validatePromise";

const form = createForm();

const MarkupSchema: FC = () => (
    <Panel
        form={form}
        header={
            <h2>
                异步校验 - <code>Markup Schema</code>
            </h2>
        }>
        <SchemaField>
            <SchemaField.String
                name="async_validate_1"
                title="异步校验"
                x-component="Input"
                x-decorator="FormItem"
                x-validator={validateRules.promise_1}
                required
            />
            <SchemaField.String
                name="async_validate_2"
                title="异步校验(onBlur)"
                x-component="Input"
                x-decorator="FormItem"
                x-validator={{
                    triggerType: "onBlur",
                    validator: validateRules.promise_1,
                }}
                required
            />
        </SchemaField>
    </Panel>
);

export default MarkupSchema;
