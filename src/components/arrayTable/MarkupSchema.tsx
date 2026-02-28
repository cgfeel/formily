import { createForm, isField, onFieldChange, onFieldReact } from "@formily/core";
import { FC } from "react";
import SchemaField from "./SchemaField";
import Pannel from "./Pannel";

const form = createForm({
  effects: () => {
    // 主动联动模式：路径，依赖项，操作
    onFieldChange("hideFirstColumn", ["value"], field => {
      isField(field) &&
        field.query("table_list.column5").take(target => {
          target.visible = !field.value;
        });
    });
    // 被动联动模式：路径，操作，被动模式没有依赖项
    onFieldReact("table_list.*.a2", field => {
      field.visible = !field.query(".a1").get("value");
    });
  },
});

const MarkupSchema: FC = () => (
  <Pannel
    footer={
      <div>
        <p>
          在批量新增的时候，使用了<code>FormConsumer</code>，用于获取添加的状态决定是否屏蔽按钮点击
        </p>
        <p>
          <code>FormProvider</code>不能像<code>@formily/antd-v5</code>中的<code>form</code>支持
          <code>onAutoSubmitFailed</code>，但是可以通过组件 <code>Submit</code> 捕获提交异常
        </p>
      </div>
    }
    form={form}
    header={
      <h2>
        通过<code>Markup Schema</code>创建自增表格
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.Boolean
        name="hideFirstColumn"
        title="隐藏 A2"
        x-component="Switch"
        x-decorator="FormItem"
      />
      <SchemaField.Array
        name="table_list"
        x-component="ArrayTable"
        x-decorator="FormItem"
        x-component-props={{
          pagination: { pageSize: 10 },
          scroll: { x: 1000 },
        }}
      >
        <SchemaField.Object>
          <SchemaField.Void
            name="column1"
            x-component="ArrayTable.Column"
            x-component-props={{ align: "center", title: "Sort", width: 50 }}
          >
            <SchemaField.Void x-component="ArrayTable.SortHandle" x-decorator="FormItem" required />
          </SchemaField.Void>
          <SchemaField.Void
            name="column2"
            x-component="ArrayTable.Column"
            x-component-props={{ align: "center", title: "Index", width: 80 }}
          >
            <SchemaField.Void x-component="ArrayTable.Index" x-decorator="FormItem" required />
          </SchemaField.Void>
          <SchemaField.Void
            name="column3"
            x-component="ArrayTable.Column"
            x-component-props={{ dataIndex: "a0", title: "A0", width: 200 }}
          >
            <SchemaField.String name="a0" x-component="Input" x-decorator="Editable" required />
          </SchemaField.Void>
          <SchemaField.Void
            name="column4"
            x-component="ArrayTable.Column"
            x-component-props={{
              dataIndex: "a1",
              title: "显隐->A2",
              width: 100,
            }}
          >
            <SchemaField.Boolean name="a1" x-component="Switch" x-decorator="FormItem" />
          </SchemaField.Void>
          <SchemaField.Void
            name="column5"
            x-component="ArrayTable.Column"
            x-component-props={{ title: "A2", width: 200 }}
          >
            <SchemaField.String name="a2" x-component="Input" x-decorator="FormItem" required />
          </SchemaField.Void>
          <SchemaField.Void
            name="column6"
            x-component="ArrayTable.Column"
            x-component-props={{ title: "A3", width: 200 }}
          >
            <SchemaField.String name="a3" x-component="Input" x-decorator="FormItem" required />
          </SchemaField.Void>
          <SchemaField.Void
            name="column7"
            x-component="ArrayTable.Column"
            x-component-props={{
              dataIndex: "operations",
              fixed: "right",
              title: "Operations",
            }}
          >
            <SchemaField.Void x-component="FormItem">
              <SchemaField.Void x-component="ArrayTable.Remove" />
              <SchemaField.Void x-component="ArrayTable.MoveDown" />
              <SchemaField.Void x-component="ArrayTable.MoveUp" />
            </SchemaField.Void>
          </SchemaField.Void>
        </SchemaField.Object>
        <SchemaField.Void title="添加条目" x-component="ArrayTable.Addition" />
      </SchemaField.Array>
    </SchemaField>
  </Pannel>
);

export default MarkupSchema;
