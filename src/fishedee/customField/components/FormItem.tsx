import { observer } from "@formily/react";
import { createStyles } from "antd-style";
import { FC, PropsWithChildren, useContext } from "react";
import { FieldContext } from "../Context";

const useStyles = createStyles({
  wrap: {
    height: 20,
  },
  tips: {
    color: "#f00",
    fontSize: 12,
    height: 20,
  },
});

const FormItem: FC<PropsWithChildren> = ({ children }) => {
  const field = useContext(FieldContext);
  const { styles } = useStyles();

  const { decoratorProps, errors = [] } = field;
  // console.log("items", field);
  return (
    <div>
      <div className={styles.wrap} style={decoratorProps?.style}>
        {field.title}
      </div>
      {children}
      <div className={styles.tips}>{errors.map(item => item.messages).join(",")}</div>
    </div>
  );
};

export default observer(FormItem);
