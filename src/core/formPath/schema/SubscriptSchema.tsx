import { ISchema, ISchemaFieldProps } from "@formily/react";
import { FC, PropsWithChildren } from "react";
import SchemaField from "./SchemaField";
import { InputProps } from "antd";
import { FormPath } from "@formily/core";

const SubscriptSchema: FC<PropsWithChildren<SubscriptSchemaProps>> = ({
    children,
    componentProps,
    reactions,
    scope,
    pathValidator,
}) => {
    const { pathProps, textProps } = componentProps || {};
    const { copy, path, print, remove, text } = reactions || {};
    return (
        <SchemaField scope={scope}>
            <SchemaField.Array name="group" x-component="ArrayItems" x-decorator="FormItem">
                <SchemaField.Object>
                    <SchemaField.Void name="input" x-component="Space">
                        <SchemaField.Void x-component="ArrayItems.SortHandle" x-decorator="FormItem" />
                        <SchemaField.String
                            name="path"
                            title="路径"
                            x-component="Input"
                            x-decorator="FormItem"
                            x-component-props={pathProps}
                            x-reactions={path}
                            x-validator={value => {
                                try {
                                    FormPath.parse(value);
                                    return pathValidator ? pathValidator(value) : "";
                                } catch {
                                    return "路径不正确";
                                }
                            }}
                        />
                        <SchemaField.String
                            name="text"
                            title="匹配值"
                            x-component="Input"
                            x-decorator="FormItem"
                            x-component-props={textProps}
                            x-reactions={text}
                        />
                        <SchemaField.Boolean
                            name="read"
                            title="只读"
                            x-component="Switch"
                            x-decorator="FormItem"
                            x-display="hidden"
                        />
                        <SchemaField.Void x-component="ArrayItems.Remove" x-decorator="FormItem" x-reactions={remove} />
                        <SchemaField.Void x-component="ArrayItems.Copy" x-decorator="FormItem" x-reactions={copy} />
                    </SchemaField.Void>
                    <SchemaField.String
                        name="print"
                        title="输出"
                        x-component="ReadPretty"
                        x-decorator="FormItem"
                        x-decorator-props={{ style: { paddingLeft: 24 } }}
                        x-reactions={print}
                    />
                </SchemaField.Object>
                <SchemaField.Void title="添加条目" x-component="ArrayItems.Addition" />
            </SchemaField.Array>
            {children}
        </SchemaField>
    );
};

type componentProps = Partial<Record<"pathProps" | "textProps", InputProps>>;
type reactionsType = Partial<Record<"copy" | "path" | "print" | "remove" | "text", ISchema["x-reactions"]>>;

export interface SubscriptSchemaProps extends Pick<ISchemaFieldProps, "scope"> {
    componentProps?: componentProps;
    reactions?: reactionsType;
    pathValidator?: (value: string) => string;
}

export { SchemaField };

export default SubscriptSchema;
