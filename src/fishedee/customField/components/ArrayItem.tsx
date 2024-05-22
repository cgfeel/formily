import { isArrayField } from "@formily/core";
import { observer } from "@formily/react";
import { FC, useContext } from "react";
import ArrayBase, { ArrayBaseProps } from "../../reactField/childrenRender/ArrayBase";
import { FieldContext } from "../Context";
import { ArrayProps } from "../CustomField";

const ArrayItems: FC<ArrayItemsProps> = ({ defaultData, children }) => {
    const field = useContext(FieldContext);
    return !isArrayField(field) ? null : (
        <ArrayBase defaultData={defaultData} field={field}>
            {field.value.map((_, index) => (
                <div key={index}>
                    <div>{children && children(index)}</div>
                    <button onClick={() => field.remove(index)}>删除</button>
                </div>
            ))}
        </ArrayBase>
    );
};

export interface ArrayItemsProps extends Pick<ArrayBaseProps, "defaultData">, ArrayProps {}

export default observer(ArrayItems);
