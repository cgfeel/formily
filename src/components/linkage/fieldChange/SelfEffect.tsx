import { DataField, createForm, onFieldValueChange } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const colorReverse = (color: string) => {
    const oldColor = parseInt("0x" + color.replace(/#/g, ""), 16);
    const str = "000000" + (0xffffff - oldColor).toString(16);

    return "#" + str.substring(str.length - 6, str.length);
};

const getColor = ({ value }: DataField) => {
    const str = String(value)
        .replaceAll(/[^a-zA-Z\d]*/g, "")
        .toUpperCase();

    const color = "#" + (str + "0".repeat(6)).substring(0, 6);
    return [str, color, colorReverse(color)];
};

const form = createForm({
    effects: () => {
        onFieldValueChange("color", field => {
            const [value, backgroundColor, color] = getColor(field);
            field.value = value;
            field.setComponentProps({
                style: {
                    backgroundColor,
                    color,
                },
            });
        });
    },
});

const SelfEffect: FC = () => (
    <Panel
        footer={<p>通过监听自身地址进行联动，在这里修正了文档中颜色取值的一些问题</p>}
        form={form}
        header={
            <h2>
                自身联动：<code>Effects</code> 用例
            </h2>
        }>
        <SchemaField>
            <SchemaField.String
                default="FFFFFF"
                name="color"
                title="颜色"
                x-component="Input"
                x-decorator="FormItem"
                x-component-props={{
                    maxLength: 6,
                    prefix: "#",
                }}
            />
        </SchemaField>
    </Panel>
);

export default SelfEffect;
