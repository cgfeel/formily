import { Field, isField } from "@formily/core";
import { ExpressionScope } from "@formily/react";
import { FC, PropsWithChildren } from "react";
import SchemaField from "./SchemaField";

const VisibleContainer: FC<PropsWithChildren> = ({ children }) => (
    <ExpressionScope
        value={{
            asyncVisible(field: Field, target: Field) {
                field.loading = true;
                field.disabled = true;
                setTimeout(() => {
                    field.loading = false;
                    field.disabled = false;
                    if (isField(field)) {
                        target.setDisplay(field.value);
                    }
                }, 1000);
            },
        }}>
        {children}
    </ExpressionScope>
);

const FieldScope: FC = () => (
    <SchemaField.Object name="scope" title="5.2.作用域联动" x-decorator="VoidComponent">
        <SchemaField.String
            name="select"
            title="控制者"
            default="visible"
            x-component="Select"
            x-decorator="FormItem"
            enum={[
                { label: "显示", value: "visible" },
                { label: "隐藏", value: "none" },
                { label: "隐藏-保留值", value: "hidden" },
            ]}
            x-reactions={{
                target: "scope.input2",
                effects: ["onFieldValueChange"],
                fulfill: {
                    run: "{{asyncVisible($self, $target)}}",
                },
            }}
        />
        <SchemaField.String name="input2" title="受控者" x-component="Input" x-decorator="FormItem" />
    </SchemaField.Object>
);

export { VisibleContainer };

export default FieldScope;
