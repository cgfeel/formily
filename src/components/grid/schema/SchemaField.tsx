import { FormGrid, FormItem, Input } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";

const SchemaField = createSchemaField({
  components: {
    FormGrid,
    FormItem,
    Input,
  },
});

export default SchemaField;
