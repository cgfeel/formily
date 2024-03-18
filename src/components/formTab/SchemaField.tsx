import { FormItem, Input } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import FormTab from "./form-tab";

const SchemaField = createSchemaField({
    components: {
        FormItem,
        FormTab,
        Input,
    },
});

export default SchemaField;
