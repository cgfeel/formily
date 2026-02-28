import { FormItem, Input, Password } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Password,
  },
});

export default SchemaField;
