import { Field, createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm();

const asyncVisible = (field: Field, target: Field) => {
    field.loading = true;
    form.setFieldState(target, async state => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/form/select-field/${field.value}`);
        const { visible }: VisibleType = await res.json();

        state.display = visible;
        field.loading = false;
    });
};

const AsyncSchema: FC = () => (
    <Panel
        footer={
            <p>
                通过 <code>fulfill</code> 属性 <code>run</code> 将当前字段 <code>$self</code> 和监控字段{" "}
                <code>$target</code> 发送给 <code>scope</code> 中的异步函数进行处理
            </p>
        }
        form={form}
        header={
            <h2>
                异步联动：<code>Effects</code> 用例
            </h2>
        }>
        <SchemaField scope={{ asyncVisible }}>
            <SchemaField.String
                default="visible"
                name="select"
                title="控制者"
                x-component="Select"
                x-decorator="FormItem"
                enum={[
                    { label: "显示", value: "visible" },
                    { label: "隐藏", value: "none" },
                    { label: "隐藏-保留值", value: "hide" },
                ]}
                x-reactions={[
                    {
                        target: "input",
                        effects: ["onFieldInit", "onFieldValueChange"],
                        fulfill: {
                            run: "{{asyncVisible($self, $target)}}",
                        },
                    },
                ]}
            />
            <SchemaField.String
                name="input"
                title="受控者"
                x-component="Input"
                x-decorator="FormItem"
                x-visible={false}
            />
        </SchemaField>
    </Panel>
);

type VisibleType = {
    visible: "hidden" | "none" | "visible";
};

export default AsyncSchema;
