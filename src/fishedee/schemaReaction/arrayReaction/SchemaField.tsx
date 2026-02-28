import { ArrayCards, FormItem, Input } from "@formily/antd-v5";
import { createSchemaField, observer } from "@formily/react";
import VoidComponentRaw from "../../reactField/VoidComponent";

const VoidComponent = observer(VoidComponentRaw);

const SchemaField = createSchemaField({
  components: {
    ArrayCards,
    FormItem,
    Input,
    VoidComponent,
  },
});

export default SchemaField;
