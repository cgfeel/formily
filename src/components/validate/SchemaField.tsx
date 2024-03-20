import { FormItem, Input, NumberPicker } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";

const FORMATS = [
    "url",
    "email",
    "phone",
    "ipv6",
    "ipv4",
    "number",
    "integer",
    "qq",
    "idcard",
    "money",
    "zh",
    "date",
    "zip",
];

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        NumberPicker,
    },
});

export { FORMATS };

export default SchemaField;
