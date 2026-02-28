import { FormItem, Input, Select, Space } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import ObjectCollapse from "./component/ObjectCollapse";

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ObjectCollapse,
    Select,
    Space,
  },
});

export default SchemaField;
