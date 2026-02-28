import { FormItem, Input } from "@formily/antd-v5";
import { Field } from "@formily/react";
import { FC } from "react";
import Pannel, { buttonClick, fieldKeys } from "./Pannel";

const FixedInner: FC = () => (
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

const FiexdJsx: FC = () => (
  <Pannel
    footer={
      <div>
        <p>
          <code>Dialog</code>和<code>Drawer</code>的区别：
        </p>
        <ul>
          <li>
            <code>Drawer</code>不支持通过<code>portal</code>的方式传递<code>context</code>，
            <code>portal</code>在这里只负责<code>cssinjs</code>中的<code>prefixCls</code>
          </li>
          <li>
            <code>Drawer</code>相对减少了相关的中间件，具体见文档，所有操作通过按钮组件完成
          </li>
        </ul>
      </div>
    }
    header={
      <h2>
        通过<code>Jsx</code>创建抽屉表单
      </h2>
    }
    onClick={() => buttonClick(<FixedInner />, { [fieldKeys[0]]: "789" })}
  />
);

export default FiexdJsx;
