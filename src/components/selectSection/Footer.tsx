import { FC } from "react";

const Footer: FC = () => (
  <div>
    <p>
      来自之前面试字节的题目，要求做一个部门成员选择的浮窗，支持展开员工所属部门。在此要求上实现了：
    </p>
    <ul>
      <li>搜索筛选、最近选择记录，部门成员选择、排序、展示已选择成员、取消选择。</li>
    </ul>
    <p>
      示例并没有采用全 <code>formily</code> 交互的方式，而是为了让 <code>formily</code> 与{" "}
      <code>React</code> 进行交互，这里选择了 <code>Antd</code> 的多表单交互方式：
    </p>
    <ul>
      <li>
        将整个 <code>SchemaField</code> 包裹为一个 <code>Antd Form</code>
      </li>
      <li>
        通过<code>Antd</code>表单容器化的方式，将每个<code>form</code>包装为<code>FormItem</code>
      </li>
      <li>
        通过<code>FormItem</code>自身数据的 <code>value</code> 和 <code>onChange</code>{" "}
        和表单数据进行交互
      </li>
    </ul>
    <p>为啥要这样做？</p>
    <ul>
      <li>
        远程加载数据和提交请求，在之前的案例有演示，本次示例也有用到，见方法：
        <code>asyncDataSource</code>
      </li>
      <li>
        除了和远程服务进行交互外，也可能存在 <code>formily</code> 负责联动管理，将最终结果由{" "}
        <code>React</code> 来负责处理的情况。
      </li>
    </ul>
    <p>怎么实现的：</p>
    <ul>
      <li>
        通过 <code>createEffectContext</code> 提供 <code>React</code> 字段挂载监听，字段更新触发{" "}
        <code>Antd</code> 字段的 <code>onChange</code>
      </li>
      <li>
        提供一个 <code>SectionBase</code> 基础组件，根据挂载拿到的 <code>mount</code>，
        <code>Antd</code> 字段的 <code>value</code> 更新 <code>formily</code> 对应的字段
      </li>
    </ul>
  </div>
);

export default Footer;
