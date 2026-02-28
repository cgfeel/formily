import { isArrayField } from "@formily/core";
import { ISchema, observer } from "@formily/react";
import { FC, useContext } from "react";
import { FieldContext } from "../customField/Context";
import ArrayBase, { ArrayBaseProps } from "../reactField/childrenRender/ArrayBase";
import { FieldSchemaContext, RecursionField } from "./Context";

const isSchema = (schema: ISchema["items"]): schema is ISchema =>
  typeof schema === "object" && "type" in schema;

const ArrayItems: FC<ArrayItemsProps> = ({ defaultData }) => {
  const field = useContext(FieldContext);
  const { items } = useContext(FieldSchemaContext);

  return !isArrayField(field) ? null : (
    <ArrayBase defaultData={defaultData} field={field}>
      {field.value.map((_, index) => (
        <div key={index}>
          <div>{isSchema(items) && <RecursionField name={index.toString()} schema={items} />}</div>
          <button onClick={() => field.remove(index)}>删除</button>
        </div>
      ))}
    </ArrayBase>
  );
};

export interface ArrayItemsProps extends Pick<ArrayBaseProps, "defaultData"> {}

export default observer(ArrayItems);
