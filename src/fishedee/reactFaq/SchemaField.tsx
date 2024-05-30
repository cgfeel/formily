import { ArrayTable, FormItem, Input, NumberPicker, Select } from "@formily/antd-v5";
import { createSchemaField, observer } from "@formily/react";
import InputRaw, { WraperInput } from "./component/InputRaw";
import VoidComponent from "./component/VoidComponent";

const VoidCom = observer(VoidComponent);

const SchemaField = createSchemaField({
    components: {
        ArrayTable,
        FormItem,
        Input,
        InputRaw,
        NumberPicker,
        Select,
        VoidCom,
        WraperInput,
    },
});

export default SchemaField;
