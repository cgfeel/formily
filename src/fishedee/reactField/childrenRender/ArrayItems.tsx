import { ArrayField } from "@formily/core";
import { observer, useField } from "@formily/react";
import { FC } from "react";
import ArrayBase, { ArrayBaseProps } from "./ArrayBase";

const ArrayItems: FC<ArrayItemsProps> = ({ defaultData }) => {
  const field = useField<ArrayField>();
  return (
    <ArrayBase defaultData={defaultData} field={field}>
      {field.value.map((_, index) => (
        <div key={index}>
          <div>{field.componentProps.childrenRender(index)}</div>
          <button onClick={() => field.remove(index)}>删除</button>
        </div>
      ))}
    </ArrayBase>
  );
};

export interface ArrayItemsProps extends Pick<ArrayBaseProps, "defaultData"> {}

export default observer(ArrayItems);
