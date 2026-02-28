import {
  ArrayItems,
  DatePicker,
  Editable,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  Password,
  Select,
} from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import Cascader from "../cascader/cascader";
import IDUpload, { PopInput } from "./components/IDUpload";
import { fetchAddress } from "./action";

const SchemaField = createSchemaField({
  components: {
    ArrayItems,
    Cascader,
    DatePicker,
    Editable,
    FormGrid,
    FormItem,
    FormLayout,
    IDUpload,
    Input,
    Password,
    PopInput,
    Select,
  },
  scope: { fetchAddress },
});

export default SchemaField;
