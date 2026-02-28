import { FC } from "react";
import SchemaField from "./SchemaField";

const BatchChange: FC = () => (
  <SchemaField.Object
    name="batch-change"
    title="5.3.1.批量主动联动"
    x-decorator="VoidComponent"
    description={
      <p>
        其中字段 <code>field4</code>、<code>field5</code> 通过分组匹配进行联动
      </p>
    }
  >
    <SchemaField.String
      name="input"
      title="控制者"
      x-component="Input"
      x-decorator="FormItem"
      x-reactions={[
        {
          target: "batch-change.input2",
          fulfill: {
            state: { value: "{{'[' + ($self.value||'') + ']'}}" },
          },
        },
        {
          target: "batch-change.input3",
          fulfill: {
            state: { value: "{{'$' + ($self.value||'') + '$'}}" },
          },
        },
        {
          target: "batch-change.*(input4,input5)",
          fulfill: {
            state: { value: "{{'-' + ($self.value||'') + '-'}}" },
          },
        },
      ]}
    />
    <SchemaField.String name="input2" title="受控者 1" x-component="Input" x-decorator="FormItem" />
    <SchemaField.String name="input3" title="受控者 2" x-component="Input" x-decorator="FormItem" />
    <SchemaField.String name="input4" title="受控者 3" x-component="Input" x-decorator="FormItem" />
    <SchemaField.String name="input5" title="受控者 4" x-component="Input" x-decorator="FormItem" />
  </SchemaField.Object>
);

export default BatchChange;
