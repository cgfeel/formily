import { Input } from "@formily/antd-v5";
import { ArrayField } from "@formily/core";
import { Field, observer } from "@formily/react";
import { Button, Space } from "antd";
import { FC } from "react";
import useStyles from "../../style";

const ArrayFieldTypeCom: FC<ArrayFieldTypeComProps> = ({ field }) => {
  const { styles } = useStyles();
  return (
    <>
      <div>
        {field.value.map((_, index) => (
          <div className={styles} key={index}>
            <Space>
              <Field name={index} component={[Input]} />
              <Button onClick={() => field.remove(index)}>Remove</Button>
              <Button onClick={() => field.moveUp(index)}>Move Up</Button>
              <Button onClick={() => field.moveDown(index)}>Move Down</Button>
            </Space>
          </div>
        ))}
      </div>
      <Button onClick={() => field.push("")}>Add</Button>
    </>
  );
};

export interface ArrayFieldTypeComProps {
  field: ArrayField;
}

export default observer(ArrayFieldTypeCom);
