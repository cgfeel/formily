import { createForm } from "@formily/core";
import { FC } from "react";
import SchemaField from "./SchemaField";
import Wrapper from "../fieldAction/Wrapper";

const form = createForm({
    initialValues: {
        data: [1],
        data1: [2],
    },
});

const RecursionField: FC = () => (
    <Wrapper
        footer={
            <div>
                <p>
                    迭代数组字段值在 <code>RecursionField</code> 中 <code>name</code>{" "}
                    使用字段下标作为路径，渲染模型并创建子集 <code>schema</code> 字段
                </p>
                <p>
                    这里我起了两组，分别演示了 <code>ArrayField</code> 下的 <code>Field</code>，以及在{" "}
                    <code>Field</code> 外包一层 <code>VoidField</code>，<code>schema</code>{" "}
                    解构不同但是数据匹配路径相同。这说明了 <code>VoidField</code> 的路径可以忽略直接由上一级进行匹配。
                </p>
                <p>
                    做这个研究的目的是由 <code>ArrayTable</code> 这个组件想到，每一个 <code>ArrayTable.column</code>{" "}
                    都是一个 <code>VoidField</code>，它的父级是 <code>ArrayField.item</code>，它的子集是{" "}
                    <code>Field</code>，设置或不设置 <code>ArrayTable.column</code> 的 <code>name</code>
                    ，都不影响内部字段的路径，也不影响其赋值
                </p>
                <p>
                    最后在回到 fishedee 文档上来，列出了很多关于 <code>basePath</code>{" "}
                    的总结，但对于使用者来说只要记住两点：
                </p>
                <ol>
                    <li>
                        <code>name</code>是自身的路径，<code>basePath</code> 是为了然自身路径前提有个父级路径
                    </li>
                    <li>
                        数组路径在迭代字段值的时候，将下标作为 <code>RecursionField</code> 的 <code>name</code>
                    </li>
                </ol>
            </div>
        }
        form={form}
        header={
            <h2>
                Core.6.4: <code>RecursionField</code> 的 <code>name</code> 属性
            </h2>
        }>
        <SchemaField>
            <SchemaField.Array name="data" x-component="ArrayComponent">
                <SchemaField.String name="name" x-component="Input" x-decorator="FormItem" />
            </SchemaField.Array>
            <SchemaField.Array name="data1" x-component="ArrayComponent">
                <SchemaField.Void name="name">
                    <SchemaField.String name="name" x-component="Input" x-decorator="FormItem" />
                </SchemaField.Void>
            </SchemaField.Array>
        </SchemaField>
    </Wrapper>
);

export default RecursionField;
