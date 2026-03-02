import {
  DatePicker,
  Input,
  NumberPicker,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import Cascader from "../../cascader/cascader";
import FormItem from "../../formItem/form-item";
import FormLayout from "../../formLayout/form-layout";

const SchemaField = createSchemaField({
  components: {
    Cascader,
    DatePicker,
    FormItem,
    FormLayout,
    Input,
    NumberPicker,
    Radio,
    Select,
    Switch,
    TreeSelect,
  },
});

export default SchemaField;
