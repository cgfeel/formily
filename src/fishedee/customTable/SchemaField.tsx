import { FormItem, Input, NumberPicker } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import ArrayField from "./ArrayField";

const SchemaField = createSchemaField({
    components: {
        ArrayField,
        FormItem,
        Input,
        NumberPicker,
    },
});

export default SchemaField;
