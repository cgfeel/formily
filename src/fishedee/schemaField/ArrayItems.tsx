import { ArrayField } from "@formily/core";
import { RecursionField, observer, useField, useFieldSchema } from "@formily/react";
import { FC } from "react";
import ArrayBase, { ArrayBaseProps } from "../reactField/childrenRender/ArrayBase";

const ArrayItems: FC<ArrayItemsProps> = ({ defaultData }) => {
  const field = useField<ArrayField>();
  const { items = [] } = useFieldSchema();
  return (
    <ArrayBase defaultData={defaultData} field={field}>
      {field.value.map((_, index) => (
        <div key={index}>
          <div>
            <RecursionField
              name={index}
              schema={Array.isArray(items) ? items[index] || items[0] : items}
            />
          </div>
          <button onClick={() => field.remove(index)}>删除</button>
        </div>
      ))}
    </ArrayBase>
  );
};

export interface ArrayItemsProps extends Pick<ArrayBaseProps, "defaultData"> {}

export default observer(ArrayItems);
