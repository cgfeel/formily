import { isField } from "@formily/core";
import { FC, useContext } from "react";
import Line from "../Line";
import { FormActionContext } from "../Mount";

const FieldSetValue: FC = () => {
    const { form, mount } = useContext(FormActionContext);
    return (
        <Line title="field.setValue">
            <button
                disabled={!mount}
                onClick={() =>
                    form.query("name").take(field => {
                        if (isField(field)) field.setValue("234");
                    })
                }>
                name: "234"
            </button>
            <button
                disabled={!mount}
                onClick={() =>
                    form.query("age").take(field => {
                        if (isField(field)) field.setValue(234);
                    })
                }>
                age: 234
            </button>
        </Line>
    );
};

export default FieldSetValue;
