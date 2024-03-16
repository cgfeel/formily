import { FormItem, FormStep, Input } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";

const SchemaField = createSchemaField({
    components: {
        FormItem,
        FormStep,
        Input,
    },
});

export default SchemaField;
