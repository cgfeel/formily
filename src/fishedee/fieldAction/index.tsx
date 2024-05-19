import { createForm } from "@formily/core";
import { FC, useMemo } from "react";
import Field from "./Field";
import Mount from "./Mount";
import Wrapper from "./Wrapper";
import FieldSetValue from "./action/FieldSetValue";
import FieldValue from "./action/FieldValue";
import FormSetValues from "./action/FormSetValues";
import FormValues from "./action/FormValues";
import InitialValue from "./action/Initialvalue";
import OnInput from "./action/OnInput";
import Reset from "./action/Reset";
import SetComponent from "./action/SetComponent";
import SetFieldState from "./action/SetFieldState";
import SetValueIn from "./action/SetValueIn";

const fields = ["name", "age"];

const FieldAction: FC = () => {
    const form = useMemo(() => createForm(), []);
    return (
        <Wrapper
            footer={
                <div>
                    <p>
                        为了循序渐进的目的，演示以 <code>@formily/reactive</code> 和 <code>@formily/core</code>{" "}
                        来实现，避开是用 <code>@formily/react</code> 相关组件和 <code>Schema</code>
                    </p>
                    <p>
                        文档没有提到的，<code>field.setValue</code>、<code>field.setInitialValue</code>{" "}
                        只能在创建字段后使用，创建字段之前请直接赋值 <code>form.values</code>、
                        <code>form.initialValue</code>
                    </p>
                </div>
            }
            form={form}
            header={<h2>core.1.1：字段值的获取与更新</h2>}>
            <Field name="name" />
            <Field name="age" />
            <Mount fields={fields} form={form}>
                <FieldValue />
                <FieldSetValue />
                <FormValues />
                <SetValueIn />
                <FormSetValues />
                <SetFieldState />
                <InitialValue />
                <Reset />
                <OnInput />
                <SetComponent />
            </Mount>
        </Wrapper>
    );
};

export default FieldAction;
