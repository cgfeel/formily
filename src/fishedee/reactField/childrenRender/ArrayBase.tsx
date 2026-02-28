import { ArrayField } from "@formily/core";
import { createStyles } from "antd-style";
import { FC, PropsWithChildren } from "react";

const useStyles = createStyles({
  item: {
    padding: 10,
  },
  wrap: {
    borderBottom: "2px solid rgb(186 203 255)",
    paddingBottom: 24,
  },
});

const ArrayBase: FC<PropsWithChildren<ArrayBaseProps>> = ({
  children,
  field,
  defaultData = {},
}) => {
  const { styles } = useStyles();
  return (
    <div className={styles.wrap}>
      <div className={styles.item}>{children}</div>
      <button onClick={() => field.push(defaultData)}>添加一行</button>
    </div>
  );
};

export interface ArrayBaseProps {
  field: ArrayField;
  defaultData?: any;
}

export default ArrayBase;
