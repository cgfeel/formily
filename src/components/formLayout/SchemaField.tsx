import { FormItem, FormLayout, Input, Select } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";

const SchemaField = createSchemaField({
    components: {
        FormItem,
        FormLayout,
        Input,
        Select,
    },
});

export default SchemaField;
