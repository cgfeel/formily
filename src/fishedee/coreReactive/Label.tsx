import { FC } from "react";
import { InputProps } from "./Context";
import { createStyles, css } from "antd-style";

const useStyle = createStyles(css`
  height: 28px;
  padding: 0 5px;
`);

const Label: FC<InputProps> = ({ value }) => {
  const { styles } = useStyle();
  return <div className={styles}>{value}</div>;
};

export default Label;
