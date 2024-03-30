import { createForm } from "@formily/core";
import { ISchema, observer } from "@formily/react";
import { FC, useRef } from "react";
import Form from "../../form/form";
import SchemaField from "../SchemaField";
import { schemaA, schemaB } from "./server";
import Wraper from "./Wraper";

const form = createForm<FormControllType>();

const DYNAMIC_INJECT_SCHEMA = { schemaA, schemaB };
const TYPE_SCHEMA: ISchema = {
    title: "类型",
    type: "string",
    "x-component": "Select",
    "x-decorator": "FormItem",
    enum: [
        { label: "类型1", value: "schemaA" },
        { label: "类型2", value: "schemaB" },
    ],
};

const ClearFormGraphInner = observer(() => {
    const oldTypeRef = useRef<string | null>(null);
    const currentType = form.values.type || null;

    const schema: ISchema = {
        type: "object",
        properties: {
            type: TYPE_SCHEMA,
            ...(currentType === null ? {} : { container: DYNAMIC_INJECT_SCHEMA[currentType] }),
        },
    };

    if (oldTypeRef.current !== currentType) {
        form.clearFormGraph("container.*"); // 回收字段模型
    }

    oldTypeRef.current = currentType;
    return (
        <Form layout="vertical" form={form}>
            <SchemaField schema={schema} />
        </Form>
    );
});

const ClearFormGraph: FC = () => (
    <Wraper
        footer={
            <div>
                <p>实现原理：</p>
                <ul>
                    <li>
                        通过 <code>form.clearFormGraph</code> 清除字段模式 <code>schema</code>，然后重新提供模型
                    </li>
                    <li>
                        提醒：当前受控下不会刷新整个表单 <code>form</code> 对象，所以需要借助 <code>observer</code>{" "}
                        去响应表单变更
                    </li>
                </ul>
            </div>
        }
        header={
            <h2>
                <code>Schema</code> 片段联动{"(顶层控制)"}
            </h2>
        }>
        <ClearFormGraphInner />
    </Wraper>
);

export default ClearFormGraph;
