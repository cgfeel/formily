import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm();

const OnInputSchema: FC = () => (
    <Panel
        footer={
            <div>
                <p>
                    在 <code>reactions</code> 中通过 <code>dependencies</code>{" "}
                    获取依赖数据计算响应值，和文档不同的是演示通过 <code>when</code>{" "}
                    去进行判断，而不是在像文档那种通过三元运算去计算响应值，这样在实际开发更实用
                </p>
            </div>
        }
        form={form}
        header={
            <h2>
                循环联动：<code>SchemaReactions</code> 用例
            </h2>
        }>
        <SchemaField>
            <SchemaField.Number
                name="total"
                title="总价"
                x-component="NumberPicker"
                x-decorator="FormItem"
                x-reactions={{
                    dependencies: ["count", "price"],
                    when: "{{$deps[0] !== void 0 && $deps[1] !== void 0}}",
                    fulfill: {
                        state: {
                            value: "{{$deps[0] * $deps[1]}}",
                        },
                    },
                }}
            />
            <SchemaField.Number
                name="count"
                title="数量"
                x-component="NumberPicker"
                x-decorator="FormItem"
                x-reactions={{
                    dependencies: ["price", "total"],
                    when: "{{$deps[0] > 0 && $deps[1] !== void 0}}",
                    fulfill: {
                        state: {
                            value: "{{$deps[1] / $deps[0]}}",
                        },
                    },
                }}
            />
            <SchemaField.Number
                name="price"
                title="单价"
                x-component="NumberPicker"
                x-decorator="FormItem"
                x-reactions={{
                    dependencies: ["count", "total"],
                    when: "{{$deps[0] > 0 && $deps[1] !== void 0}}",
                    fulfill: {
                        state: {
                            value: "{{$deps[1] / $deps[0]}}",
                        },
                    },
                }}
            />
        </SchemaField>
    </Panel>
);

export default OnInputSchema;
