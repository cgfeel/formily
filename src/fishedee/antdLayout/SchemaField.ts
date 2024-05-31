import { FormItem, Input, Space } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Space,
    }
});

export default SchemaField;