import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Form from "../../../form/form";
import Wraper from "../Wraper";
import SchemaField from "./SchemaField";

const form = createForm();
const schema: ISchema = {
    type: "object",
    properties: {
        type: {
            title: "类型",
            type: "string",
            "x-component": "Select",
            "x-decorator": "FormItem",
            enum: [
                { label: "类型1", value: "schemaA" },
                { label: "类型2", value: "schemaB" },
            ],
            "x-component-props": { allowClear: true },
        },
        container: {
            type: "object",
            "x-component": "CustomCom",
        },
    },
};

const CustomIndex: FC = () => (
    <Wraper
        footer={
            <div>
                <p>在这个例子中通过自定义组件的方式响应受控，分别用到：</p>
                <ul>
                    <li>
                        <code>RecursionField</code>：递归渲染组件，在组件中代替 <code>SchemaField</code> 解析模型{" "}
                        <code>schema</code>
                    </li>
                    <li>
                        <code>useForm</code>：获取 <code>form</code> 实例，在这个案例中用于回收字段模型
                    </li>
                    <li>
                        <code>useField</code>
                        ：自定义组件内读取当前字段属性，在这个案例中用于获取字段路径用于回收模型，以及分配给{" "}
                        <code>RecursionField</code> 去匹配 <code>properties</code>
                    </li>
                </ul>
                <p>
                    巩固：在 <code>React</code> 中要响应表单数据，就要用到 <code>observer</code>
                    ，要么刷新整个表单；要么就和当前案例一样在受控组件上分别包裹 <code>observer</code>{" "}
                    响应对应的表单数据变化
                </p>
            </div>
        }
        header={<h2>Schema 片段联动{"(自定义组件)"}</h2>}>
        <Form layout="vertical" form={form}>
            <SchemaField schema={schema} />
        </Form>
    </Wraper>
);

export default CustomIndex;
