import {
  Form,
  GeneralField,
  createEffectHook,
  createForm,
  isField,
  onFieldInit,
  onFieldInitialValueChange,
  onFieldValueChange,
  onFormInit,
} from "@formily/core";
import { FC, useState } from "react";
import FormLine from "./FormLine";
import { useFormEffects } from "@formily/react";

const fileInput = (field: GeneralField) => isField(field) && field.onInput(123);

const customReset = createEffectHook("form-reset", (reset: boolean, form: Form) => {
  reset ? form.query("time").take(fileInput) : form.reset();
  return listener => listener();
});

const form = createForm({
  effects: () => {
    onFormInit(form => form.createField({ name: "time" }));
    onFieldInit("time", fileInput);

    onFieldValueChange("time", () => console.log("value change"));
    onFieldInitialValueChange("time", () => console.log("init change"));
  },
});

const Reset: FC = () => {
  const [reset, setReset] = useState(false);
  useFormEffects(() => {
    customReset(() => setReset(val => !val));
  });
  return (
    <button onClick={() => form.notify("form-reset", reset)}>{reset ? "reback" : "reset"}</button>
  );
};

const OnInput: FC = () => {
  const [time, setTime] = useState(Date.now());
  return (
    <FormLine title="oninput: 123" form={form}>
      <button
        onClick={() => {
          form.setInitialValues({ time });
          setTime(Date.now());
        }}
      >
        init: {time}
      </button>
      <Reset />
    </FormLine>
  );
};

export default OnInput;
