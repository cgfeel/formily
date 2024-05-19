import { GeneralField, isField } from "@formily/core";
import { observer } from "@formily/react";
import { FC } from "react";
import Line from "../fieldAction/Line";

const Field: FC<FieldProps> = ({ field, type = "text" }) =>
    !isField(field) ? null : (
        <div>
            <Line title={field.title || field.address.toString()}>
                <input
                    name={field.address.toString()}
                    type={type}
                    onBlur={() => field.onBlur()}
                    onChange={e => field.onInput(type === "number" ? parseInt(e.target.value) : e.target.value)}
                    onFocus={() => field.onFocus()}
                />
            </Line>
            <p>
                {field.address.toString()}: {field.errors.map(item => item.messages).join(",")}
            </p>
        </div>
    );

export interface FieldProps {
    field?: GeneralField;
    type?: "number" | "text";
}

export default observer(Field);
