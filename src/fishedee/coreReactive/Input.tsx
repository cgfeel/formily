import { createStyles, css } from "antd-style";
import { FC } from "react";
import { InputProps } from "./Context";

const useStyle = createStyles(css`
  border: 2px solid rgb(186, 203, 255);
  border-radius: 6px;
  height: 28px;
  max-width: 100%;
  padding: 0 5px;
  width: 400px;
`);

const Input: FC<InputProps> = ({ type = "text", value = "", ...props }) => {
  const { styles } = useStyle();
  return <input {...props} className={styles} type={type} value={value} />;
};

export default Input;
