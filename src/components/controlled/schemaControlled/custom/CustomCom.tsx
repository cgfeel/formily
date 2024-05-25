import { RecursionField, observer, useField, useForm } from "@formily/react";
import { FC, useEffect, useState } from "react";
import { schemaA, schemaB } from "../server";

const DYNAMIC_INJECT_SCHEMA = { schemaA, schemaB };

const CustomCom: FC = () => {
    const field = useField();
    const form = useForm<FormControllType>();
    const [schema, setSchema] = useState({});

    // 当调用依赖的值 `type` 的时候，该组件只响应 `type` 值发生的改变
    const { type } = form.values;
    const { address } = field;

    useEffect(() => {
        form.clearFormGraph(`${address}.*`); //回收字段模型
        setSchema(type === void 0 ? {} : DYNAMIC_INJECT_SCHEMA[type]);
    }, [address, form, type, setSchema]);

    // onlyRenderProperties：是否只渲染properties
    return <RecursionField basePath={address} schema={schema} onlyRenderProperties />;
};

export default observer(CustomCom);
