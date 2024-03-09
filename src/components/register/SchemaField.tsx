import { Field } from "@formily/core";
import {
    ArrayItems,
    Cascader,
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
import { action } from "@formily/reactive";
import IDUpload, { LocationItem, PopInput, transform } from "./components/IDUpload";

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
    scope: {
        /**
         * 作为受控调用的作用域函数
         *  - 受控函数接受一个`Field`类型的参数，提供的方法和属性通过编辑器查看`.d.ts`
         *  - `action.bound`的用途是绑定上下文，但这里并没有用到上下文，即便传普通函数也是一样处理
         */
        fetchAddress: (field: Field) => {
            field.loading = true;
            fetch("//unpkg.com/china-location/dist/location.json")
                .then(res => res.json())
                .then(
                    action.bound!((data: Record<string, LocationItem>) => {
                        field.dataSource = transform(data);
                        field.loading = false;
                    }),
                );
        },
    },
});

export default SchemaField;
