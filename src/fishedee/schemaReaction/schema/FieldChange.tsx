import { FC } from "react";
import SchemaField from "./SchemaField";

const FieldChange: FC = () => (
  <SchemaField.Object
    description={
      <p>
        纠正文档：<code>JsonSchema</code> 也可以使用联动表达式
      </p>
    }
    name="change"
    title="5.1.1.主动联动"
    x-decorator="VoidComponent"
  >
    <SchemaField.String
      description="输入 123"
      name="input"
      title="控制者"
      x-component="Input"
      x-decorator="FormItem"
      x-reactions={{
        target: "change.input2",
        fulfill: {
          state: {
            visible: "{{$self.value === '123'}}",
          },
        },
      }}
    />
    <SchemaField.String name="input2" title="受控者" x-component="Input" x-decorator="FormItem" />
  </SchemaField.Object>
);

export default FieldChange;
