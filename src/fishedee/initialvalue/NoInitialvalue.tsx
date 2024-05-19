import { createForm, onFormInit } from "@formily/core";
import { FC, useState } from "react";
import FormLine from "./FormLine";

const form = createForm({
    effects: () => {
        onFormInit(form => form.createField({ name: "time" }));
    },
});

const NoInitialvalue: FC = () => {
    const [time, setTime] = useState(Date.now());
    return (
        <FormLine title="initialValues: {}" form={form}>
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

export default NoInitialvalue;
