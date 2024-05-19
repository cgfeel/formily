import { FC, useContext } from "react";
import Line from "../Line";
import { FormActionContext } from "../Mount";

const Reset: FC = () => {
    const { form, mount } = useContext(FormActionContext);
    return (
        <Line title="form.reset">
            <button disabled={!mount} onClick={() => form.reset()}>
                有和没有 initialvalue，点重置看区别
            </button>
        </Line>
    );
};

export default Reset;
