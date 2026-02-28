import { createForm } from "@formily/core";
import { FC } from "react";
import SchemaField from "../SchemaField";
import FormCom from "./FormCom";

// 创建表单核心领域模型
const normalForm = createForm({
  /**
   * 校验策略：（拿到的校验结果是一个数组）
   *  - 如果某个校验规则校验失败则立即返回结果，在 `field` 初始化的时候传入参数 `validateFirst` 为 `true` 即可
   *  - 默认是 `false`，也就是校验失败也会继续校验
   */
  validateFirst: true,
});

const NormalMarkup: FC = () => (
  <FormCom form={normalForm}>
    <SchemaField>
      {/**
       * 创建一个字符串类型的字段
       *  - name: 字段名称，即用于表单字段名也作为查找路径
       *  - title: 标题，这个属性和`decorator`有关联，详细见：https://formilyjs.org/zh-CN/guide/quick-start
       *  - x-component: 表单组件
       *  - x-component-props: 组件属性，见antd组件Api
       *  - x-decorator: 包装器，即`input`和对应的`label`外部的包装器
       *  - x-validator: 校验器，详细见：https://core.formilyjs.org/zh-CN/guide/field#%E6%A0%A1%E9%AA%8C%E5%99%A8
       *  - required: 展示必填选项
       * ----
       * 提示：
       *  - 当前是通过`createSchemaField`提供的`SchemaField`来创建字段
       *  - 也可以通过`@formily/react`的`Form`表单来创建字段，其`component`和`decorator`引入方式会不一样
       */}
      <SchemaField.String
        name="username"
        title="用户名"
        x-component="Input"
        x-component-props={{
          prefix: "{{icon('user')}}",
        }}
        x-decorator="FormItem"
        x-validator={{
          required: true,
        }}
        required
      />
      <SchemaField.String
        name="password"
        title="密码"
        x-component="Password"
        x-component-props={{
          autoComplete: "off",
          prefix: "{{icon('pwd')}}",
        }}
        x-decorator="FormItem"
        required
      />
    </SchemaField>
  </FormCom>
);

export default NormalMarkup;
