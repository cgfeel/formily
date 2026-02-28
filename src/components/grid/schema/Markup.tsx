import { createForm } from "@formily/core";
import { FC } from "react";
import Pannel, { field } from "../Pannel";
import SchemaField from "./SchemaField";

const form = createForm();

const Markup: FC = () => (
  <Pannel
    form={form}
    header={
      <h2>
        通过<code>Markup Schema</code>实现网格布局
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, minColumns: 2 }}>
        {field.map(key => (
          <SchemaField.String
            key={key}
            name={key.repeat(3)}
            title={key.repeat(3).toUpperCase()}
            x-component="Input"
            x-decorator="FormItem"
            x-decorator-props={{ gridSpan: key === "a" ? 2 : 1 }}
          />
        ))}
      </SchemaField.Void>
    </SchemaField>
  </Pannel>
);

export default Markup;
