import { FC, useContext } from "react";
import { FormActionContext } from "../Mount";
import Line from "../Line";

const SetValueIn: FC = () => {
  const { form, mount } = useContext(FormActionContext);
  return (
    <Line title="form.setValueIn">
      <button disabled={!mount} onClick={() => form.setValuesIn("name", "123")}>
        name: "123"
      </button>
      <button disabled={!mount} onClick={() => form.setValuesIn("age", 123)}>
        age: 123
      </button>
    </Line>
  );
};

export default SetValueIn;
