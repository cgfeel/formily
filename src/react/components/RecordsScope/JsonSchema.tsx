import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Panel from "../../Panel";
import SchemaField, { renderTmp } from "./SchemaField";

const form = createForm();
const schema: ISchema = {
    type: "object",
    properties: {
        records_field: {
            type: "void",
            "x-component": "MyCustomComponent",
            "x-component-props": {
                index: 0,
                records: [
                    {
                        code: "Code",
                        name: "Name",
                    },
                ],
            },
            properties: {
                input: {
                    type: "string",
                    "x-component": "Input",
                    "x-decorator": "FormItem",
                    "x-value": "{{renderTmp($records)}}",
                },
            },
        },
    },
};

const JsonSchema: FC = () => (
    <Panel
        form={form}
        header={
            <h2>
                <code>RecordsScope</code> - JsonSchema
            </h2>
        }>
        <SchemaField schema={schema} scope={{ renderTmp }} />
    </Panel>
);

export default JsonSchema;
