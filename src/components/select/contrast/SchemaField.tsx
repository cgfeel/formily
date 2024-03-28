import { Input, Select } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import FormItem from "../../formItem/form-item";

const SchemaFiled = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
    },
});

export default SchemaFiled;
