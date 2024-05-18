import { FC } from "react";
import { InputProps } from "./Context";
import Input from "./Input";

const Password: FC<Omit<InputProps, "type">> = props => <Input {...props} type="password" />;

export default Password;
