import { createForm, isField, onFieldReact } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm({
  effects: () => {
    onFieldReact("total", field => {
      if (!isField(field)) return;
      const count = field.query("count").value();
      const price = field.query("price").value();
      if (count !== void 0 && price !== void 0) {
        field.value = count * price;
      }
    });
    onFieldReact("price", field => {
      if (!isField(field)) return;
      const count = field.query("count").value();
      const total = field.query("total").value();
      if (total !== void 0 && count > 0) {
        field.value = total / count;
      }
    });
    onFieldReact("count", field => {
      if (!isField(field)) return;
      const total = field.query("total").value();
      const price = field.query("price").value();
      if (total !== void 0 && price > 0) {
        field.value = total / price;
      }
    });
  },
});

const OnInputEffect: FC = () => (
  <Panel
    footer={
      <div>
        <p>
          通过 <code>field.query</code> 去获取对应的字段计算响应结果
        </p>
        <p>
          “循环依赖”和“依赖联动”是一样的，都是通过监控指定字段去操作第三方字段，区别在于循环依赖在不同的字段之间相互计算
        </p>
      </div>
    }
    form={form}
    header={
      <h2>
        循环联动：<code>Effects</code> 用例
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.Number
        name="total"
        title="总价"
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="count"
        title="数量"
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="price"
        title="单价"
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
    </SchemaField>
  </Panel>
);

export default OnInputEffect;
