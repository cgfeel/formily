import { createForm, isField, onFieldInputValueChange } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm({
    effects: () => {
        onFieldInputValueChange("total", field => {
            if (!isField(field) || field.value === undefined) return;

            // 计算数量：总价 / 单价
            form.setFieldState("count", state => {
                const price = form.values.price;
                if (!price) return;
                state.value = field.value / price;
            });

            // 计算单价：总价 / 数量
            form.setFieldState("price", state => {
                const count = form.values.count;
                if (!count) return;
                state.value = field.value / count;
            });
        });
        onFieldInputValueChange("price", field => {
            // 计算总价：单价 * 数量
            isField(field) &&
                form.setFieldState("total", state => {
                    const count = form.values.count;
                    if (count !== undefined) state.value = field.value * count;
                });
        });
        onFieldInputValueChange("count", field => {
            // 计算总价：单价 * 数量
            isField(field) &&
                form.setFieldState("total", state => {
                    const price = form.values.price;
                    if (price !== undefined) state.value = field.value * price;
                });
        });
    },
});

const OnInputEffect: FC = () => (
    <Panel
        footer={
            <p>
                通过 <code>onFieldInputValueChange</code> 主动监听指定表单输入值
            </p>
        }
        form={form}
        header={
            <h2>
                循环联动：<code>Effects</code> 用例
            </h2>
        }>
        <SchemaField>
            <SchemaField.Number name="total" title="总价" x-component="NumberPicker" x-decorator="FormItem" />
            <SchemaField.Number name="count" title="数量" x-component="NumberPicker" x-decorator="FormItem" />
            <SchemaField.Number name="price" title="单价" x-component="NumberPicker" x-decorator="FormItem" />
        </SchemaField>
    </Panel>
);

export default OnInputEffect;
