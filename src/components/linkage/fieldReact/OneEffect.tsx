import { createForm, onFieldReact } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm({
  effects: () => {
    onFieldReact("input", field => {
      field.display = field.query("select").value();
    });
  },
});

const OneEffect: FC = () => (
  <Panel
    footer={
      <div>
        <p>
          通过 <code>onFieldReact</code> 实现被动联动，总结：
        </p>
        <ul>
          <li>
            需要监控表单的生命周期，如：<code>onFieldInit</code>、<code>onFieldMount</code>
            ，需要用到主动监控，同理在响应过程中需要用到 <code>Effect</code> 的情况通常也是主动联动
          </li>
          <li>主动联动适合监听某一个固定字段，所以路径从监控的指定字段开始</li>
          <li>被动联动适合某一个字段受控于其他多个字段对齐的影响，所以路径从被监控的字段开始</li>
        </ul>
      </div>
    }
    form={form}
    header={
      <h2>
        一对一联动：<code>Effects</code> 用例
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.String
        default="visible"
        name="select"
        title="控制者"
        x-component="Select"
        x-decorator="FormItem"
        enum={[
          { label: "显示", value: "visible" },
          { label: "隐藏", value: "none" },
          { label: "隐藏-保留值", value: "hidden" },
        ]}
      />
      <SchemaField.String name="input" title="受控者" x-component="Input" x-decorator="FormItem" />
    </SchemaField>
  </Panel>
);

export default OneEffect;
