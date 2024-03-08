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
import styled from "@emotion/styled";
import IDUpload from "./components/IDUpload";

const objectEntries = <T extends object, K = keyof T>(obj: T) => Object.entries(obj) as Array<[K, T[keyof T]]>;

const transform = (data: Record<string, LocationItem | string> | undefined = {}): Option[] =>
    objectEntries(data).reduce((buf, [key, value]) => {
        if (typeof value === "string") {
            return [...buf, { label: value, value: key }];
        }

        const { code, name, cities, districts } = value;
        const _cities = transform(cities);
        const _districts = transform(districts);

        const children = _cities.length ? _cities : _districts.length ? _districts : undefined;
        return [
            ...buf,
            {
                label: name,
                value: code,
                children,
            },
        ];
    }, [] as Option[]);

const PopInput = styled(Input)`
    width: 300px;
`;

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

interface LocationItem {
    code: string;
    name: string;
    cities?: Record<string, LocationItem>;
    districts?: Record<string, string>;
}

interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}

export default SchemaField;
