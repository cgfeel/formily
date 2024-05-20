import { createForm } from "@formily/core";
import { FC } from "react";
import Wrapper from "../fieldAction/Wrapper";
import { Field } from "@formily/react";
import { FormItem, Input } from "@formily/antd-v5";

const initialValues = {
    editable: "editable",
    disabled: "disabled",
    readOnly: "readOnly",
    readPretty: "readPretty",
};

const form = createForm({ initialValues });

const Pattern: FC = () => (
    <Wrapper form={form} header={<h2>core.4: 交互模式</h2>}>
        {Object.keys(initialValues).map(key => (
            <Field component={[Input]} decorator={[FormItem]} key={key} name={key} pattern={key} title={key} />
        ))}
    </Wrapper>
);

export default Pattern;
