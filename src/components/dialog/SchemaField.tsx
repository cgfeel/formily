import { FormItem, Input } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
    },
});

export default SchemaField;
