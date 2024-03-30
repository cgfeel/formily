import { Input, Select } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import FormItem from "../../../formItem/form-item";
import CustomCom from "./CustomCom";

const SchemaField = createSchemaField({
    components: {
        CustomCom,
        FormItem,
        Input,
        Select
    }
});

export default SchemaField;