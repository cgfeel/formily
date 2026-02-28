import { createForm, onFieldReact } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm({
  effects: () => {
    onFieldReact("*(input1,input2)", field => {
      field.display = field.query("select").value();
    });
  },
});

const ManyEffect: FC = () => (
  <Panel
    footer={
      <div>
        <p>
          和一对一联动是一样的，唯一的区别在于路径使用通用匹配付：<code>*(input1,input2)</code>
        </p>
      </div>
    }
    form={form}
    header={
      <h2>
        一对多联动：<code>Effects</code> 用例
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
      <SchemaField.String name="input1" title="受控者" x-component="Input" x-decorator="FormItem" />
      <SchemaField.String name="input2" title="受控者" x-component="Input" x-decorator="FormItem" />
    </SchemaField>
  </Panel>
);

export default ManyEffect;
