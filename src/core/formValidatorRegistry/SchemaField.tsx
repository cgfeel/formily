import { Input } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import FormItem from "../../components/formItem/form-item";

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
    },
});

export default SchemaField;
