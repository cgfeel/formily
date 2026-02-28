import {
  Cascader,
  DatePicker,
  FormItem,
  FormLayout,
  Input,
  NumberPicker,
  Radio,
  Select,
  Switch,
  TimePicker,
  TreeSelect,
} from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import Title from "../propretiesCase/Title";

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
    TimePicker,
    Title,
    TreeSelect,
  },
});

export default SchemaField;
