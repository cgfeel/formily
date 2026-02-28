import { FC, useContext } from "react";
import Line from "../Line";
import { FormActionContext } from "../Mount";

const SetFieldState: FC = () => {
  const { form, mount } = useContext(FormActionContext);
  return (
    <Line title="form.setFieldState">
      <button
        disabled={!mount}
        onClick={() => form.setFieldState("name", state => (state.value = "654"))}
      >
        name: "654"
      </button>
      <button
        disabled={!mount}
        onClick={() => form.setFieldState("age", state => (state.value = 654))}
      >
        age: 654
      </button>
    </Line>
  );
};

export default SetFieldState;
