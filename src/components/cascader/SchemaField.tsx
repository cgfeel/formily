import { createSchemaField } from "@formily/react";
import FormItem from "../formItem/form-item";
import Cascader from "./cascader";

const SchemaField = createSchemaField({
  components: {
    Cascader,
    FormItem,
  },
});

export default SchemaField;
