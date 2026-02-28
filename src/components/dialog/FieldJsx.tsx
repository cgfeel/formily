import { FormItem, Input } from "@formily/antd-v5";
import { Field } from "@formily/react";
import { FC } from "react";
import Pannel, { buttonClick, fieldKeys } from "./Pannel";

const FieldInner: FC = () => (
  <>
    {fieldKeys.map((key, i) => (
      <Field
        component={[Input]}
        decorator={[FormItem]}
        key={key}
        name={key}
        title={`输入框${i + 1}`}
        required
      />
    ))}
  </>
);

const FieldJsx: FC = () => (
  <Pannel
    footer={
      <div>
        <p>
          以上例子演示了 <code>FormDialog</code> 的几个能力：
        </p>
        <ul>
          <li>
            快速打开，关闭能力：通过<code>IFormDialog</code>对象触发<code>open</code>和
            <code>close</code>
          </li>
          <li>
            中间件能力，自动出现加载态：
            <ul>
              <li>
                <code>IFormDialog</code>对象中<code>forCancel</code>、<code>forConfirm</code>、
                <code>forOpen</code>都接受一个函数中间件作为参数
              </li>
              <li>
                函数第一个方法为<code>Form</code>类型，第二个为继续执行的方法
              </li>
            </ul>
          </li>
          <li>
            渲染函数内可以响应式能力：通过<code>schema</code>和<code>Field</code>
            实现表单渲染、响应、交互
          </li>
          <li>
            上下文共享能力，通过统一的<code>PortalId</code>共享上下文
          </li>
        </ul>
      </div>
    }
    header={
      <h2>
        通过<code>Jsx</code>创建弹窗表单
      </h2>
    }
    onClick={() => buttonClick(<FieldInner />, { [fieldKeys[0]]: "789" })}
  />
);

export default FieldJsx;
