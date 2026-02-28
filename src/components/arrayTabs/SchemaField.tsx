import { ArrayTabs, FormItem, Input } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";

const SchemaField = createSchemaField({
  components: {
    ArrayTabs,
    FormItem,
    Input,
  },
});

export default SchemaField;
