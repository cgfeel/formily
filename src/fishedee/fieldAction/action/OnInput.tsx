import { isField } from "@formily/core";
import { FC, useContext } from "react";
import Line from "../Line";
import { FormActionContext } from "../Mount";

const OnInput: FC = () => {
    const { form, mount } = useContext(FormActionContext);
    return (
        <Line title="field.onInput">
            <button
                disabled={!mount}
                onClick={() =>
                    form.query("name").take(field => {
                        if (isField(field)) field.onInput("222");
                    })
                }>
                name: "222"
            </button>
            <button
                disabled={!mount}
                onClick={() =>
                    form.query("age").take(field => {
                        if (isField(field)) field.onInput(222);
                    })
                }>
                age: 222
            </button>
        </Line>
    );
};

export default OnInput;
