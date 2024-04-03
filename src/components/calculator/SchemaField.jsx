import { ArrayTable, Editable, Input, NumberPicker } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import FormItem from "../formItem/form-item";

const SchemaField = createSchemaField({
    components: {
        ArrayTable,
        Editable,
        FormItem,
        Input,
        NumberPicker
    }
});

export default SchemaField;