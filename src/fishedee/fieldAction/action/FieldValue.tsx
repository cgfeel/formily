import { isField } from "@formily/core";
import { FC, useContext } from "react";
import Line from "../Line";
import { FormActionContext } from "../Mount";

const FieldValue: FC = () => {
    const { form, mount } = useContext(FormActionContext);
    return (
        <Line title="field.value">
            <button
                disabled={!mount}
                onClick={() =>
                    form.query("name").take(field => {
                        if (isField(field)) field.value = "321";
                    })
                }>
                name: "321"
            </button>
            <button
                disabled={!mount}
                onClick={() =>
                    form.query("age").take(field => {
                        if (isField(field)) field.value = 321;
                    })
                }>
                age: 321
            </button>
        </Line>
    );
};

export default FieldValue;
