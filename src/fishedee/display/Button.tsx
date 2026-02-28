import { IProviderProps, observer } from "@formily/react";
import { FC } from "react";

const Button: FC<ButtonProps> = ({ form, name, type = "hidden" }) =>
  form.query(name).take()?.display === "visible" ? (
    <button onClick={() => form.query(name).take(field => field.setDisplay(type))}>
      {type} {name}
    </button>
  ) : (
    <button onClick={() => form.query(name).take(field => field.setDisplay("visible"))}>
      show {name}
    </button>
  );

export interface ButtonProps extends IProviderProps {
  name: string;
  type?: "hidden" | "none";
}

export default observer(Button);
