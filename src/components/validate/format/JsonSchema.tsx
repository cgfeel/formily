import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import { schemaFormat } from "../data/format";

const form = createForm();
const schema: ISchema = {
    type: "object",
    properties: schemaFormat,
};

const JsonSchema: FC = () => (
    <Panel
        form={form}
        header={
            <h2>
                内置格式校验 - <code>Json Schema</code>
            </h2>
        }>
        <SchemaField schema={schema} />
    </Panel>
);

export default JsonSchema;
