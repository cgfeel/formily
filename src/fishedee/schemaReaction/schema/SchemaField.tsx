import { FormItem, Input, NumberPicker, Select } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import VoidComponent from "../../reactField/VoidComponent";

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        NumberPicker,
        Select,
        VoidComponent,
    },
});

export default SchemaField;
