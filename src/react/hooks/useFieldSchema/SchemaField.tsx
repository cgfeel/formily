import { createSchemaField, useFieldSchema } from "@formily/react";
import { FC } from "react";
import CodePreview from "../../CodePreview";

const Custom: FC = () => {
    const schema = useFieldSchema();
    return <CodePreview>{JSON.stringify(schema, null, 2)}</CodePreview>;
};

const SchemaField = createSchemaField({
    components: {
        Custom,
    },
});

export default SchemaField;
