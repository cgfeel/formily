import { createForm, onFormInit } from "@formily/core";
import { FC, useState } from "react";
import FormLine from "./FormLine";
import { observer } from "@formily/react";

const form = createForm({
    initialValues: { time: 123 },
    effects: () => {
        onFormInit(form => form.createField({ name: "time" }));
    },
});

const HasInitialvalue: FC = () => {
    const [time, setTime] = useState(Date.now());
    return (
        <FormLine title="initialValues: { time: 123 }" form={form}>
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

export default observer(HasInitialvalue);
