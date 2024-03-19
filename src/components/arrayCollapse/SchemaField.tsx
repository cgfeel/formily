import { FormItem, Input } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import ArrayCollapse from "./array-collapse";

const SchemaField = createSchemaField({
    components: {
        ArrayCollapse,
        FormItem,
        Input,
    },
});

export default SchemaField;
