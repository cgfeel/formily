import { FormItem, Input } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import FormCollapse from "./form-collapse";

const SchemaField = createSchemaField({
  components: {
    FormCollapse,
    FormItem,
    Input,
  },
});

export default SchemaField;
