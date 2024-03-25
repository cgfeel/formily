import { createForm, onFieldChange } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import FormOptions from "./FormOptions";
import SchemaField from "./SchemaField";
import { options, treeData } from "./dataSource";

const form = createForm({
    values: {
        options: {
            bordered: true,
            size: "default",
        },
    },
    effects: () => {
        onFieldChange("options.bordered", ["value"], (field, form) => {
            form.setFieldState("sizeWrap.*", state => {
                // 如果有提供的话：decorator是一个数组，第一个键值是组件名称，第二个键值是组件对象
                if (Array.isArray(state.decorator) && state.decorator[1] && "value" in field) {
                    state.decorator[1].bordered = field.value;
                }
            });
        });
        onFieldChange("options.inset", ["value"], (field, form) => {
            field.query("sizeWrap.*").forEach(({ component, decorator }) => {
                if (Array.isArray(component) && component[0] === "Switch") return;
                if (Array.isArray(decorator) && decorator[1] && "value" in field) {
                    decorator[1].inset = field.value;
                }
            });
        });
        onFieldChange("options.size", ["value"], (field, form) => {
            form.setFieldState("sizeWrap.*", state => {
                // 如果有提供的话：decorator是一个数组，第一个键值是组件名称，第二个键值是组件对象
                if (Array.isArray(state.decorator) && state.decorator[1] && "value" in field) {
                    state.decorator[1].size = field.value;
                }
            });
        });
    },
});

const MarkupSchema: FC = () => (
    <Panel
        footer={
            <div>
                <p>
                    在联动修改组件或组件的包装对象时，其 <code>component</code> 和 <code>decorator</code>{" "}
                    都返回一个长度为 2 的数组，第一个键值是组件名称，第二个键值是组件对象
                </p>
                <p>
                    修复了 <code>Switch</code> 组件和 <code>Select.Multiple</code> 不支持尺寸大小设置
                </p>
                <p>
                    修复了 <code>FormLayout</code> 不支持 <code>layout=inline</code>
                </p>
            </div>
        }
        form={form}
        header={<h2>无边框、内嵌、尺寸模式</h2>}
        submit={{ onSubmit: ({ sizeWrap }) => console.log(sizeWrap) }}>
        <SchemaField>
            <FormOptions />
            <SchemaField.Object
                name="sizeWrap"
                x-component="FormLayout"
                x-component-props={{ className: "size-wrap", labelCol: 6 }}>
                <SchemaField.String name="input" title="Input" x-component="Input" x-decorator="FormItem" required />
                <SchemaField.String
                    name="multiple-select"
                    title="Multiple Select"
                    x-component="Select"
                    x-decorator="FormItem"
                    enum={[
                        { label: "选项1", value: 1 },
                        { label: "选项2", value: 2 },
                    ]}
                    x-component-props={{ mode: "multiple", placeholder: "请选择" }}
                    required
                />
                <SchemaField.String
                    name="select"
                    title="Select"
                    x-component="Select"
                    x-decorator="FormItem"
                    enum={[
                        { label: "选项1", value: 1 },
                        { label: "选项2", value: 2 },
                    ]}
                    x-component-props={{ placeholder: "请选择" }}
                    required
                />
                <SchemaField.String
                    name="cascader"
                    title="Cascader"
                    x-component="Cascader"
                    x-decorator="FormItem"
                    x-component-props={{ options }}
                    required
                />
                <SchemaField.String
                    name="date-picker"
                    title="DatePicker"
                    x-component="DatePicker"
                    x-decorator="FormItem"
                    required
                />
                <SchemaField.String
                    name="number-picker"
                    title="NumberPicker"
                    x-component="NumberPicker"
                    x-decorator="FormItem"
                    required
                />
                <SchemaField.String
                    name="tree-select"
                    title="TreeSelect"
                    x-component="TreeSelect"
                    x-decorator="FormItem"
                    x-component-props={{ treeDefaultExpandAll: true, treeData }}
                    required
                />
                <SchemaField.String name="switch" title="Switch" x-component="Switch" x-decorator="FormItem" required />
            </SchemaField.Object>
        </SchemaField>
    </Panel>
);

export default MarkupSchema;
