import { createForm } from "@formily/core";
import { FC } from "react";
import SchemaFieldMarkup from "../register/components/SchemaFieldMarkup";
import Wrapper from "./Wrapper";

const form = createForm({
  validateFirst: true,
  editable: false,
});

const MarkupSchema: FC = () => (
  <Wrapper
    footer={
      <div>
        <p>
          通过组件<code>PreviewText.Placeholder</code>实现预览：
        </p>
        <ul>
          <li>
            默认全局预览通过<code>createForm</code>，将<code>editable</code>设置为{" "}
            <code>false</code>，或
            <code>readPretty</code>为<code>true</code>
          </li>
          <li>
            局部预览见后面的示例<code>ArrayTable</code>自增表格，或直接使用
            <code>PreviewText.Input</code>
            等一系列组件
          </li>
          <li>
            可通过 <code>createForm</code> 拿到的<code>form</code>对象切换可编辑状态
            <code>setState</code>
          </li>
          <li>
            表单控件可以通过受控的方式获取当前编辑状态并调整状态，见当前表单<code>姓名</code>节点
          </li>
        </ul>
      </div>
    }
    form={form}
    header={
      <h2>
        通过<code>Markup Schema</code>编辑详情
      </h2>
    }
  >
    <SchemaFieldMarkup />
  </Wrapper>
);

export default MarkupSchema;
