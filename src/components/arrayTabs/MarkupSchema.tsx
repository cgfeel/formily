import { createForm } from "@formily/core";
import { FC } from "react";
import Pannel from "./Pannel";
import SchemaField from "./SchemaField";

const form = createForm({
  validateFirst: true,
});

const MarkupSchema: FC = () => (
  <Pannel
    form={form}
    header={
      <h2>
        通过<code>Markup Schema</code>创建自增选项卡
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.Array
        maxItems={3}
        name="string_array"
        title="字符串数组"
        x-component="ArrayTabs"
        x-decorator="FormItem"
      >
        <SchemaField.String x-component="Input" x-decorator="FormItem" required />
      </SchemaField.Array>
      <SchemaField.Array
        maxItems={3}
        name="array"
        title="对象数组"
        x-component="ArrayTabs"
        x-decorator="FormItem"
      >
        <SchemaField.Object>
          <SchemaField.String
            name="aaa"
            title="AAA"
            x-component="Input"
            x-decorator="FormItem"
            required
          />
          <SchemaField.String
            name="bbb"
            title="BBB"
            x-component="Input"
            x-decorator="FormItem"
            required
          />
        </SchemaField.Object>
      </SchemaField.Array>
    </SchemaField>
  </Pannel>
);

export default MarkupSchema;
