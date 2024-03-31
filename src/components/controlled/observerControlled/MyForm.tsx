import { createForm } from "@formily/core";
import { FC, useRef } from "react";
import FormCom from "./FormCom";

const MyForm: FC<MyFormProps> = ({ values }) => {
    const count = useRef(1);
    const form = useRef(createForm({ values }));
    return <FormCom form={form.current}>Form 组件渲染次数：{count.current++}</FormCom>;
};

export interface MyFormProps {
    values: FormType;
}

export default MyForm;
