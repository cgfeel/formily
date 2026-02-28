import { Input } from "@formily/antd-v5";
import { createForm, isField, onFieldReact } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import FormItem from "../../../components/formItem/form-item";
import Panel from "../../Panel";
import Custom from "./Custom";

const form = createForm({
  effects: () => {
    onFieldReact("custom.aa", field => {
      if (isField(field)) field.value = field.query("input").value();
    });
  },
});

const UseFormEffect: FC = () => (
  <Panel
    footer={
      <div>
        <p>
          主要在自定义组件中往当前 <code>Form</code>{" "}
          实例注入副作用逻辑，用于实现一些较为复杂的场景化组件，可以看作组件中使用{" "}
          <code>createForm</code> 中的 <code>effect</code>
        </p>
        <p>注意：</p>
        <ol>
          <li>
            在 <code>effects</code> 函数内监听 <code>onFormInit</code>{" "}
            是无效的，因为渲染到当前组件，
            <code>Form</code> 早已初始化
          </li>
          <li>
            同时 <code>effects</code> 函数是只会执行一次，所以想要依赖 <code>useState</code>{" "}
            的数据，请使用 <code>useRef</code> 的引用数据
          </li>
          <li>
            在 <code>effects</code> 函数中不需要像 <code>React</code> 的 <code>effect</code>{" "}
            那样需要添加副作用的依赖项，依赖的字段会通过内部 <code>field.query</code> 自动收集
          </li>
        </ol>
      </div>
    }
    form={form}
    header={
      <h2>
        <code>useFormEffect</code>
      </h2>
    }
  >
    <Field name="input" component={[Input]} decorator={[FormItem]} />
    <Field name="custom" component={[Custom]} decorator={[FormItem]} />
  </Panel>
);

export default UseFormEffect;
