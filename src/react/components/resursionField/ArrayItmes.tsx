import { ArrayField } from "@formily/core";
import { RecursionField, observer, useField, useFieldSchema } from "@formily/react";
import { Button, Space } from "antd";
import { createStyles } from "antd-style";
import { FC } from "react";

const useStyles = createStyles(
  ({ token, css }) => css`
    margin-bottom: ${token.marginMD}px;
  `,
);

const ArrayItems: FC<ArrayField> = ({ value }) => {
  const field = useField<ArrayField>();
  const { items } = useFieldSchema();
  const { styles } = useStyles();

  return (
    <div>
      {value.map((_, index) => (
        <div className={styles} key={index}>
          <Space>
            {items && (
              <RecursionField
                schema={Array.isArray(items) ? items[index] || items[0] : items}
                name={index}
              />
            )}
            <Button onClick={() => field.remove(index)}>Remove</Button>
          </Space>
        </div>
      ))}
      <Button onClick={() => field.push({})}>Add</Button>
    </div>
  );
};

export default observer(ArrayItems);
