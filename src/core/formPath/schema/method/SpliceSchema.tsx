import { FC } from "react";
import SchemaField from "../SchemaPropertyField";
import SingleSchema from "./SingleSchema";

const SpliceSchema: FC = () => (
  <SingleSchema
    feedbackText="对数据操作路径做 splice 操作，文档中要插入的数据除了字符还支持数组，实际使用过程中由于 formily 类型不对，插入数组 eslint 检查过不去，建议使用路径字符"
    name="splice"
  >
    <SchemaField.Object name="splice-index" x-component="Space" x-decorator="FormItem">
      <SchemaField.Number
        default={2}
        name="start"
        title="起始位置"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-component-props={{
          max: 100,
          min: 0,
        }}
        x-reactions={{
          fulfill: {
            state: { value: "{{$self.value??0}}" },
          },
        }}
      />
      <SchemaField.Number
        default={0}
        name="delete"
        title="删除数量"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-component-props={{
          max: 100,
          min: 0,
        }}
        x-reactions={{
          fulfill: {
            state: { value: "{{$self.value??0}}" },
          },
        }}
      />
    </SchemaField.Object>
    <SchemaField.Object
      name="splice-array"
      title="插入值"
      x-component="Space"
      x-decorator="FormItem"
    >
      <SchemaField.String
        default="ee.gg"
        name="input1"
        x-component="FieldInput"
        x-decorator="FormItem"
        x-component-props={{
          allowClear: true,
          patten: /[^\d\w.]/g,
          placeholder: "选填，例如：kk.oo",
        }}
      />
      <SchemaField.String
        name="input2"
        x-component="FieldInput"
        x-decorator="FormItem"
        x-component-props={{
          allowClear: true,
          patten: /[^\d\w.]/g,
          placeholder: "选填，例如：kk.oo",
        }}
      />
      <SchemaField.String
        name="input3"
        x-component="FieldInput"
        x-decorator="FormItem"
        x-component-props={{
          allowClear: true,
          patten: /[^\d\w.]/g,
          placeholder: "选填，例如：kk.oo",
        }}
      />
    </SchemaField.Object>
  </SingleSchema>
);

export default SpliceSchema;
