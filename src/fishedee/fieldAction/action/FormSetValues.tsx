import { FC, useContext } from "react";
import Line from "../Line";
import { FormActionContext } from "../Mount";

const FormSetValues: FC = () => {
  const { form, mount } = useContext(FormActionContext);
  return (
    <Line title="form.setValues">
      <button disabled={!mount} onClick={() => form.setValues({ name: "561", age: 567 })}>
        name: "567", age: 567
      </button>
    </Line>
  );
};

export default FormSetValues;
