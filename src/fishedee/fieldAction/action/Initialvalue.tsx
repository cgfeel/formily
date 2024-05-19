import { isField } from "@formily/core";
import { FC, useContext } from "react";
import Line from "../Line";
import { FormActionContext } from "../Mount";

const InitialValue: FC = () => {
    const { form, mount } = useContext(FormActionContext);
    return (
        <Line title="field.InitialValue">
            <button
                disabled={!mount}
                onClick={() =>
                    form.query("name").take(field => {
                        if (isField(field)) field.initialValue = "111";
                    })
                }>
                name: "111"
            </button>
            <button
                disabled={!mount}
                onClick={() =>
                    form.query("age").take(field => {
                        if (isField(field)) field.initialValue = 111;
                    })
                }>
                age: 111
            </button>
        </Line>
    );
};

export default InitialValue;
