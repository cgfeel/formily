import { FC } from "react";
import SchemaField from "../SchemaField";

const ArrayUnshift: FC = () => (
  <SchemaField.Array
    maxItems={3}
    name="array_unshift"
    x-component="ArrayCollapse"
    x-decorator="FormItem"
    x-component-props={{ defaultOpenPanelCount: 8 }}
  >
    <SchemaField.Object
      x-component="ArrayCollapse.CollapsePanel"
      x-component-props={{ header: "对象数组 (unshift)" }}
    >
      <SchemaField.String
        description="输入 123"
        name="aa"
        title="AA"
        x-component="Input"
        x-decorator="FormItem"
        required
      />
      <SchemaField.String
        name="bb"
        x-component="Input"
        x-decorator="FormItem"
        x-reactions={[
          {
            dependencies: [".aa"],
            when: "{{$deps[0] !== '123'}}",
            fulfill: {
              schema: {
                title: "BB",
                "x-disabled": true,
              },
            },
            otherwise: {
              schema: {
                title: "Changed",
                "x-disabled": false,
              },
            },
          },
        ]}
        required
      />
      <SchemaField.Void x-component="ArrayCollapse.Index" />
      <SchemaField.Void x-component="ArrayCollapse.Remove" />
      <SchemaField.Void x-component="ArrayCollapse.MoveUp" />
      <SchemaField.Void x-component="ArrayCollapse.MoveDown" />
    </SchemaField.Object>
    <SchemaField.Void
      title="添加条目 (unshift)"
      x-component="ArrayCollapse.Addition"
      x-component-props={{ method: "unshift" }}
    />
  </SchemaField.Array>
);

export default ArrayUnshift;
