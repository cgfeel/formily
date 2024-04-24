import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Panel from "../../Panel";
import SchemaField, { renderTmp } from "./SchemaField";

const form = createForm();
const schema: ISchema = {
    type: "object",
    properties: {
        lookup_field: {
            type: "void",
            "x-component": "MyCustomComponent",
            "x-component-props": {
                index: 1,
                record: {
                    code: "Lookup Code",
                    name: "Lookup Name",
                },
            },
            properties: {
                record_field: {
                    type: "void",
                    "x-component": "MyCustomComponent",
                    "x-component-props": {
                        index: 0,
                        record: {
                            code: "Code",
                            name: "Name",
                        },
                    },
                    properties: {
                        input: {
                            type: "string",
                            "x-component": "Input.TextArea",
                            "x-decorator": "FormItem",
                            "x-value": "{{renderTmp($record, $lookup, $index)}}",
                        },
                    },
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
                <code>RecordScope</code> - JsonSchema
            </h2>
        }>
        <SchemaField schema={schema} scope={{ renderTmp }} />
    </Panel>
);

export default JsonSchema;
