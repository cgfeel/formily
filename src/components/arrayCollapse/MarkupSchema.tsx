import { createForm } from "@formily/core";
import { FC } from "react";
import ArrayObject, { effects } from "./component/ArrayObject";
import ArrayUnshift from "./component/ArrayUnshift";
import StringArray from "./component/StringArray";
import Pannel from "./Pannel";
import SchemaField from "./SchemaField";

const form = createForm({
  validateFirst: true,
  effects,
});

const MarkupSchema: FC = () => (
  <Pannel
    footer={
      <div>
        <p>
          <code>defaultOpenPanelCount</code>的设置区别见初始化后的对比，在手风琴模式下无论
          <code>defaultOpenPanelCount</code>是多少，永远展示第一个
        </p>
        <p>
          当 <code>ArrayCollapse</code> 中子级表单是 <code>string</code> 类型的 <code>Input</code>{" "}
          的时候，节点的 <code>name</code> 将被忽略，只有当子级是 <code>object</code> 的时候{" "}
          <code>name</code> 才能作为对象属性
        </p>
      </div>
    }
    form={form}
    header={
      <h2>
        通过<code>Markup Schema</code>创建自增折叠表单
      </h2>
    }
  >
    <SchemaField>
      <StringArray />
      <ArrayObject />
      <ArrayUnshift />
    </SchemaField>
  </Pannel>
);

export default MarkupSchema;
