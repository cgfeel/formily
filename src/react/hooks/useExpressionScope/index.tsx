import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../../Panel";
import SchemaField from "./SchemaField";

const form = createForm();

const UseExpressionScope: FC = () => (
  <Panel
    footer={
      <div>
        <p>主要在自定义组件中读取表达式作用域，表达式作用域的来源主要有：</p>
        <ul>
          <li>
            <code>createSchemaField</code> 顶层下发
          </li>
          <li>
            <code>SchemaField</code> 组件下发
          </li>
          <li>
            <code>ExpressionScope</code>/<code>RecordScope</code>/<code>RecordsScope</code>{" "}
            自定义组件内部下发
          </li>
        </ul>
      </div>
    }
    form={form}
    header={
      <h2>
        <code>useExpressionScope</code>
      </h2>
    }
  >
    <SchemaField scope={{ propsScope: { code: "Props Code", name: "Props Name" } }}>
      <SchemaField.Void
        name="my-records"
        x-component="MyRecords"
        x-component-props={{
          records: [{ code: "Records[0] Code", name: "Records[0] Name" }],
        }}
      >
        <SchemaField.Void
          name="my-record"
          x-component="MyRecord"
          x-component-props={{
            index: 2,
            record: { code: "Record Code", name: "Record Name" },
          }}
        >
          <SchemaField.Void
            name="my-record-1"
            x-component="MyRecord"
            x-component-props={{
              index: 1,
              record: { code: "Record Code-1", name: "Record Name-1" },
            }}
          >
            <SchemaField.Void name="my-express" x-component="MyExpress">
              <SchemaField.String name="custom" x-component="Custom" />
            </SchemaField.Void>
          </SchemaField.Void>
        </SchemaField.Void>
      </SchemaField.Void>
    </SchemaField>
  </Panel>
);

export default UseExpressionScope;
