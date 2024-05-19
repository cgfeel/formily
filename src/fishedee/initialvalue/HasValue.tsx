import { createForm } from "@formily/core";
import { FC, useState } from "react";
import FormLine from "./FormLine";

const form = createForm({
    values: { time: 123 },
});

const HasValue: FC = () => {
    const [time, setTime] = useState(Date.now());
    return (
        <FormLine title="value: { time: 123 }" form={form}>
            <button
                onClick={() => {
                    form.setInitialValues({ time });
                    setTime(Date.now());
                }}>
                init: {time}
            </button>
            <button onClick={() => form.reset()}>reset</button>
        </FormLine>
    );
};

export default HasValue;
