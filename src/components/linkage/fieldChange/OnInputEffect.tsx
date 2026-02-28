import { createForm, isField, onFieldInputValueChange } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm({
  effects: () => {
    onFieldInputValueChange("total", field => {
      if (!isField(field) || field.value === void 0) return;

      // 计算数量：总价 / 单价
      form.setFieldState("count", state => {
        const price = form.values.price;
        if (!price) return;
        state.value = field.value / price;
      });

      // 计算单价：总价 / 数量
      form.setFieldState("price", state => {
        const count = form.values.count;
        if (!count) return;
        state.value = field.value / count;
      });
    });
    onFieldInputValueChange("price", field => {
      // 计算总价：单价 * 数量
      isField(field) &&
        form.setFieldState("total", state => {
          const count = form.values.count;
          if (count !== void 0) state.value = field.value * count;
        });
    });
    onFieldInputValueChange("count", field => {
      // 计算总价：单价 * 数量
      isField(field) &&
        form.setFieldState("total", state => {
          const price = form.values.price;
          if (price !== void 0) state.value = field.value * price;
        });
    });
  },
});

const OnInputEffect: FC = () => (
  <Panel
    footer={
      <div>
        <p>
          通过 <code>onFieldInputValueChange</code> 主动监听指定表单输入值
        </p>
        <p>“循环依赖”和“依赖联动”是一样的，都是通过监控指定字段去操作第三方字段，区别在于：</p>
        <ul>
          <li>
            循环依赖是相互之间去操作对方的值，依赖联动是根据相互的值去推算第三方值，前者在操作上可能会有个逻辑问题
          </li>
          <li>
            循环依赖是通过 <code>form.values</code> 获取第三方值，依赖联动是通过{" "}
            <code>field.query</code> 获取第三方值，最终结果是一样
          </li>
        </ul>
        <p>
          备注：<code>onFieldInputValueChange</code> 和 <code>onFieldValueChange</code>{" "}
          目前看没有明显的差别，无论是 <code>onChange</code> 还是 <code>onInput</code>
          ，更新字段都会实时回调，甚至在受控状态下 <code>onFieldReact</code>，不区分
          <code>onChange</code> 和 <code>onInput</code>
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
