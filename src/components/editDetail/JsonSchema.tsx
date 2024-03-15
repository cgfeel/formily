import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Wrapper from "./Wrapper";
import SchemaField from "../register/SchemaField";
import { schema } from "../register/components/service";

const form = createForm({
    validateFirst: true,
    readPretty: true,
});

const deleteSchema = (schema: ISchema, fields: string[]) => {
    fields.forEach(key => {
        if (schema.properties && typeof schema.properties !== "string" && key in schema.properties) {
            delete schema.properties[key];
        }
    });
    return schema;
};

const JsonSchema: FC = () => {
    const fileds = deleteSchema(schema, ["password", "confirm_password"]);
    return (
        <Wrapper
            form={form}
            header={
                <h2>
                    通过<code>Json Schema</code>编辑详情
                </h2>
            }>
            <SchemaField schema={fileds} />
        </Wrapper>
    );
};

export default JsonSchema;
