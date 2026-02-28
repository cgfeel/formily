import { FC, useContext } from "react";
import Line from "../Line";
import { FormActionContext } from "../Mount";

const SetComponent: FC = () => {
  const { form, mount } = useContext(FormActionContext);
  return (
    <Line title="field.setComponent">
      <button
        disabled={!mount}
        onClick={() => form.query("name").take(field => field.setComponent("Input"))}
      >
        name: "Input"
      </button>
      <button
        disabled={!mount}
        onClick={() => form.query("age").take(field => field.setComponent("Number"))}
      >
        age: "Number"
      </button>
    </Line>
  );
};

export default SetComponent;
