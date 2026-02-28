import { createForm } from "@formily/core";
import { FC } from "react";
import Wrapper from "../fieldAction/Wrapper";
import SchemaField from "./SchemaField";

const form = createForm();

const ReactCom: FC = () => (
  <Wrapper
    footer={
      <p>
        文档整合的方式很传统且繁琐，这里通过字段受控 +
        自定义组件的形式优化，结构更清晰；除此之外建议阅读当前章节的：实现自定义组件，能够对 React
        整合 <code>formily</code> 更深的了解
      </p>
    }
    form={form}
    header={
      <h2>
        React.7.7: React 方式组合 <code>formily</code>
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.Void
        name="select"
        x-data={1}
        x-component="SelectBtn"
        x-content="切换Select"
        x-decorator="FormItem"
      />
      <SchemaField.Void
        name="title"
        x-data={1}
        x-component="SelectBtn"
        x-content="切换Title"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input"
        x-component="Input"
        x-decorator="FormItem"
        x-reactions={[
          {
            dependencies: ["select#data"],
            fulfill: {
              schema: {
                title: "{{'Select-' + $deps[0]}}",
                "x-component-props.placeholder": "{{'Please input select: ' + $deps[0]}}",
              },
            },
          },
          {
            dependencies: ["title#data"],
            fulfill: {
              schema: {
                title: "{{'Title-' + $deps[0]}}",
                "x-component-props.placeholder": "{{'Please input title: ' + $deps[0]}}",
              },
            },
          },
        ]}
      />
    </SchemaField>
  </Wrapper>
);

export default ReactCom;
