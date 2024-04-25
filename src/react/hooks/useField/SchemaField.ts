import { Input } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import FormItem from "./FormItem";

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
    }
});

export default SchemaField;