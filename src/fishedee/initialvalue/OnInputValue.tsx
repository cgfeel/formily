import { GeneralField, createForm, isField, onFieldInit, onFormInit } from "@formily/core";
import { FC, useState } from "react";
import FormLine from "./FormLine";

const fileInput = (field: GeneralField) => isField(field) && field.onInput(123);

const form = createForm({
    effects: () => {
        onFormInit(form => form.createField({ name: "time" }));
        onFieldInit("time", fileInput);
    },
});

const OnInputValue: FC = () => {
    const [time, setTime] = useState(Date.now());
    return (
        <FormLine title="oninput: 123" form={form}>
            <button
                onClick={() => {
                    form.setValues({ time });
                    setTime(Date.now());
                }}>
                val: {time}
            </button>
            <button onClick={() => form.reset()}>reset</button>
        </FormLine>
    );
};

export default OnInputValue;
