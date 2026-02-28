import { createForm, onFieldValueChange, onFormInit } from "@formily/core";
import { FormConsumer } from "@formily/react";
import { FC } from "react";
import Wrapper from "../../fieldAction/Wrapper";
import SchemaField from "../SchemaField";
import SubItemSchema from "./SubItemSchema";

const form = createForm<FormType>({
  values: {},
  effects: () => {
    onFormInit(() => {
      setTimeout(
        () =>
          form.setValues({
            detail: {
              type: "COMBO",
              "select-items": [
                { amount: 123, price: 12 },
                { amount: 456, price: 10 },
              ],
            },
          }),
        800,
      );
    });
    onFieldValueChange("detail.type", field => {
      form.setFieldState("detail.select-items.column1", state => {
        state.visible = field.value === "COMBO";
      });
    });
  },
});

const FieldState: FC = () => (
  <Wrapper
    footer={
      <div>
        <p>文档中使用存在以下问题：</p>
        <ul>
          <li>
            在 <code>form.effect</code> 外部使用 <code>form</code>{" "}
            生命周期的方法，这样不能确保已挂载，演示中我修改在 <code>onFormInit</code>{" "}
            中设置表单数据
          </li>
          <li>
            在字段初始化之前是不能通过 <code>setValue</code>{" "}
            来设置字段值，只能通过赋值，这也就是文档遇到的问题了。关于这点可以查看单元测试来了解：
            <code>./src/__test__/form.spec.ts</code>
            <ul>
              <li>
                表单值不会因为 <code>setValues</code> 改变
              </li>
              <li>
                表单初始值不会因为 <code>setInitialValues</code> 改变
              </li>
            </ul>
          </li>
          <li>
            除了不能在 <code>form.effect</code>{" "}
            副作用中使用异步函数，在表单和、字段的生命周期是可以使用异步函数的
            <ul>
              <li>
                <code>setTimeout</code> 监听生命周期抛出错误见单元测试：
                <code>./src/effect.spec.ts</code>，副作用里异步监听生命周期会抛出错误
              </li>
              <li>在生命周期回调函数内部异步获取数据，请参考当前章节 7.4 的演示</li>
            </ul>
          </li>
          <li>
            线上文档 7.6 通过 <code>setTimeout</code> 等待字段挂载后使用 <code>form.query</code>
            ，正确的方式应该在 <code>onFieldInit</code> 中响应字段挂载
          </li>
        </ul>
        <p>
          总结：请在 <code>form.effect</code> 正确的生命周期监听回调中操作表单，如果是{" "}
          <code>Field</code> 自定义的组件中，可以通过 <code>useFormEffects</code>{" "}
          响应表单、字段的生命周期
        </p>
      </div>
    }
    form={form}
    header={
      <h2>
        React.7.5-7.6: <code>Field</code> 状态设置和响应
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.Object name="detail">
        <SchemaField.String
          name="type"
          title="类型"
          x-component="Select"
          x-decorator="FormItem"
          enum={[
            { label: "普通物料", value: "NORMAL" },
            { label: "属性物料", value: "PROPERTY" },
            { label: "选项物料", value: "SELECT" },
            { label: "组合物料", value: "COMBO" },
          ]}
          required
        />
        <SubItemSchema />
      </SchemaField.Object>
    </SchemaField>
    <code className="consumer">
      <pre>
        <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
      </pre>
    </code>
  </Wrapper>
);

type AmountType = { amount: number };

type DetailType = {
  type: string;
  ["select-items"]: AmountType[];
};

type FormType = {
  detail: DetailType;
};

export default FieldState;
