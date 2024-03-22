import { FormItem, Input, Select } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
// import FormItem from "./form-item";
// import FormItem from "@formily/antd-v5/lib/form-item";

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
    },
});

export default SchemaField;
