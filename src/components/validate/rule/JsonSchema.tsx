import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import { inputLength, inputNumberRule, inputRequired, numberMax, numberMin } from "../data/rule";

const form = createForm();
const schema: ISchema = {
    type: "object",
    properties: {
        ...inputRequired,
        ...numberMax,
        ...numberMin,
        ...inputLength,
        ...inputNumberRule,
    },
};

const JsonSchema: FC = () => (
    <Panel
        form={form}
        header={
            <h2>
                内置规则校验 - <code>Json Schema</code>
            </h2>
        }>
        <SchemaField schema={schema} />
    </Panel>
);

export default JsonSchema;
