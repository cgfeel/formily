import { FC, useRef, useState } from "react";
import Panel from "../Panel";
import MyForm, { MyFormInstance } from "./MyForm";
import Wraper from "./Wraper";

const ControlledCard1: FC = () => {
  const [values, setValues] = useState({ input: "" });
  return (
    <Wraper
      footer={<div>响应次数根据当前组件状态更新情况决定</div>}
      title="只存在控制者"
      values={values}
      update={input => setValues({ input })}
    />
  );
};

const ControlledCard2: FC = () => {
  const [values, setValues] = useState({ input: "" });
  return (
    <Wraper
      footer={<div>响应次数根据当前组件以及子组件共同来决定</div>}
      title="通过 `props` 受控"
      values={values}
      update={input => setValues({ input })}
    >
      <MyForm value={values} onChange={values => setValues({ ...values })} />
    </Wraper>
  );
};

const ControlledCard3: FC = () => {
  const [values, setValues] = useState({ input: "" });
  const formRef = useRef<MyFormInstance | null>(null);
  return (
    <Wraper
      footer={<div>和“只存在控制者情”况一样</div>}
      title="通过 `ref` 受控"
      values={values}
      update={input => {
        formRef.current?.update({ input });
        setValues({ input });
      }}
    >
      <MyForm defaultValue={values} ref={formRef} onChange={values => setValues({ ...values })} />
    </Wraper>
  );
};

const ValueControlled: FC = () => {
  return (
    <Panel
      footer={
        <div>
          <p>
            按照 <code>React</code> 列出了 3
            个演示，全部按照状态值的数量和更新次数来决定视图刷新次数，不同在于上方备注。
          </p>
          <p>如果是在开发环境下打开，由于当前是严格模式，每次会比生产环境多一次渲染。</p>
          <p>官方文档存在几个问题：</p>
          <ol>
            <li>
              文档中初始化 <code>form</code> 对象，是通过 <code>useMemo</code>，确又没有给出依赖的{" "}
              <code>onChange</code>，目的是为了避免数据更新的时候重复生成，但这样并不符合规范
            </li>
            <li>
              <code>{"form.setValues(props.values, 'overwrite')"}</code>{" "}
              会将整个对象的值作为引用提供给 <code>form</code>，而这个值来自 <code>useState</code>{" "}
              的话，就会造成直接引用状态值，在下次数据更新的时候 <code>setState</code>{" "}
              发现更新的数据没变造成没变化
            </li>
            <li>
              在文档中，同步表单数据的依赖是 <code>{"[JSON.stringify(props.values)]"}</code>
              ，而同步的数据却是 <code>{"form.setValues(props.values, 'overwrite')"}</code>
              ，这是两个不同的对象
            </li>
          </ol>
          <p>我的优化：</p>
          <ul>
            <li>
              对于第1点：修改为 <code>useRef</code>，而不是用 <code>useMemo</code>
              ，非组件单次声明更推荐使用 <code>useRef</code>
            </li>
            <li>
              对于第2、第3点：声明依赖对象<code>{"[JSON.stringify(props.values)]"}</code>
              ，并且同步数据时通过 <code>JSON.parse</code>
            </li>
            <li>
              顺带一提：在表单数据更新将更新的数据回调的时候，更新状态前将数据再次解构了，因为通过{" "}
              <code>onFormValuesChange</code> 传回的值仍旧是一个引用
            </li>
          </ul>
          <p>
            关于 <code>form.setValues</code> 的第二个参数，官方分别给出了 4 个值分别如下：
          </p>
          <ol>
            <li>
              <code>overwrite</code>：将提供的数据对象覆盖表单值，使用的数据引用于提供的对象
            </li>
            <li>
              <code>merge</code>：将提供的数据对象合并表单值，默认值，等同 <code>deepMerge</code>
            </li>
            <li>
              <code>deepMerge</code>：将提供的数据对象合并表单值，使用的数据深拷贝于提供的对象
            </li>
            <li>
              <code>shallowMerge</code>：将提供的数据对象合并表单值，使用的数据浅拷贝于提供的对象
            </li>
          </ol>
        </div>
      }
      header={<h2>值受控</h2>}
    >
      <ControlledCard1 />
      <ControlledCard2 />
      <ControlledCard3 />
    </Panel>
  );
};

export default ValueControlled;
