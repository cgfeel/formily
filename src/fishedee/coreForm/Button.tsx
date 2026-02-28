import { observer } from "@formily/react";
import { FC, PropsWithChildren, useContext } from "react";
import { FieldContext, FormContext } from "./Context";

const Button: FC<PropsWithChildren> = ({ children }) => {
  const field = useContext(FieldContext);
  const form = useContext(FormContext);

  return (
    <button onClick={() => form.notify("custom-props", field.address.toString())}>
      {children}
    </button>
  );
};

export default observer(Button);
