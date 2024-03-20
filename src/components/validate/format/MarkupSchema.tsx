import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField, { FORMATS } from "../SchemaField";
import InputFormat from "../component/markup/InputFormat";

const form = createForm();

const MarkupSchema: FC = () => (
    <Panel
        footer={
            <p>
                <code>Schema</code>对于每个格式分别有，①<code>props</code> 设置 <code>format</code>，②
                <code>x-validator</code>接受 4 种 <code>format</code>对象：带有特定字符<code>string</code>、带有
                <code>format</code>属性的对象、带有特定字符一组字符<code>string[]</code>、带有特定字符一组对象
                <code>{"{ format }[]"}</code>。
            </p>
        }
        form={form}
        header={
            <h2>
                内置格式校验 - <code>Markup Schema</code>
            </h2>
        }>
        <SchemaField>
            {FORMATS.map(key => (
                <InputFormat format={key} key={key} />
            ))}
        </SchemaField>
    </Panel>
);

export default MarkupSchema;
