import { Input } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import FormItem from "../../../components/formItem/form-item";
import MyCustomComponent from "./MyCustomComponent";

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        MyCustomComponent,
    },
});

export default SchemaField;
