import { LockOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { FormItem, Input, Password } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import VerifyCode from "./VerifyCode";

const iconList = {
  phone: <PhoneOutlined />,
  pwd: <LockOutlined />,
  user: <UserOutlined />,
};

function isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
  return k in x;
}

/**
 * 创建字段架构
 *  - 暂且可以把`SchemaField`看做是`json`中的不同层级的段落节点
 * ----
 * 根据不同的类型划分不同的节点
 *  - 例如：Field(string、number)、ArrayField、ObjectField、VoidField（虚拟节点）
 *  - 见：https://react.formilyjs.org/zh-CN/guide/architecture
 * ----
 * 路径：
 *  - 其中层级又决定了节点查找的路径
 *  - 见：https://core.formilyjs.org/zh-CN/guide/field#%E8%B7%AF%E5%BE%84%E8%A7%84%E5%88%99
 */
const SchemaField = createSchemaField({
  /**
   * 这里分别从`@formily/antd-v5`中引入3个组件和一个自定义组件`VerifyCode`
   *  - 从自定义组件`VerifyCode`来看，和普通的`React`组件没有区别，并没有做任何特殊处理
   */
  components: {
    FormItem,
    Input,
    Password,
    VerifyCode,
  },
  // 设置一个作用域，用于作为模板变量调用，在这里设置一个返回图标组件的函数`icon`
  scope: {
    icon(name: string) {
      if (isKey(iconList, name)) return iconList[name];
    },
  },
});

export default SchemaField;
