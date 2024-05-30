import { FormItem, Input } from "@formily/antd-v5";
import { createSchemaField, observer } from "@formily/react";
import InputRaw, { WraperInput } from "./component/InputRaw";
import VoidComponent from "./component/VoidComponent";

const VoidCom = observer(VoidComponent);

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        InputRaw,
        VoidCom,
        WraperInput,
    },
});

export default SchemaField;
