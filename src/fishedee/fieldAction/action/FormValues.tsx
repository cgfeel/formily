import { FC, useContext } from "react";
import Line from "../Line";
import { FormActionContext } from "../Mount";

const FormValues: FC = () => {
  const { form, mount } = useContext(FormActionContext);
  return (
    <Line title="form.values">
      <button disabled={!mount} onClick={() => (form.values.name = "345")}>
        name: "345"
      </button>
      <button disabled={!mount} onClick={() => (form.values.age = 345)}>
        age: 345
      </button>
    </Line>
  );
};

export default FormValues;
