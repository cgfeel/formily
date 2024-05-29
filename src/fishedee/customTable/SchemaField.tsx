import { FormItem, Input, NumberPicker } from "@formily/antd-v5";
import { createSchemaField, observer } from "@formily/react";
import LabelRaw from "../coreReactive/Label";
import ArrayComponent from "./component/ArrayComponent";
import ArrayField from "./component/ArrayField";

const Label = observer(LabelRaw);

const SchemaField = createSchemaField({
    components: {
        ArrayComponent,
        ArrayField,
        FormItem,
        Input,
        Label,
        NumberPicker,
    },
});

export default SchemaField;
