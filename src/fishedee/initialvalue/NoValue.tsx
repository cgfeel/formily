import { createForm } from "@formily/core";
import { FC, useState } from "react";
import FormLine from "./FormLine";

const form = createForm();

const NoValue: FC = () => {
    const [time, setTime] = useState(Date.now());
    return (
        <FormLine title="values: {}" form={form}>
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

export default NoValue;
