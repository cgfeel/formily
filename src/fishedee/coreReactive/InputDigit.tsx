import { FC } from "react";
import { InputProps } from "./Context";
import Input from "./Input";

const InputDigit: FC<Omit<InputProps, "type">> = props => <Input {...props} type="number" />;

export default InputDigit;
