import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Panel from "../../Panel";
import SchemaField from "./SchemaField";

const form = createForm();
const schema: ISchema = {
    type: "object",
    properties: {
        lookup: {
            type: "void",
            "x-component": "MyCustomComponent",
            "x-component-props": {
                record: {
                    code: "Lookup Code",
                    name: "Lookup Name",
                },
                index: 1,
            },
            properties: {
                record: {
                    type: "void",
                    "x-component": "MyCustomComponent",
                    "x-component-props": {
                        record: {
                            code: "Code",
                            name: "Name",
                        },
                        index: 0,
                    },
                    properties: {
                        input: {
                            type: "string",
                            "x-component": "Input",
                            "x-decorator": "FormItem",
                            "x-value":
                                "{{" +
                                "${record.name} " +
                                "${record.code} " +
                                "${record.index} " +
                                "${record.lookup.name} " +
                                "${record.lookup.code} " +
                                "${record.lookup.index} " +
                                "${lookup.name} " +
                                "${lookup.code} " +
                                "}}",
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
                <code>RecordScope</code>
            </h2>
        }>
        <SchemaField schema={schema} />
    </Panel>
);

export default JsonSchema;
