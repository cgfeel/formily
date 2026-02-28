import { FC } from "react";
import SelectInput from "./contrast/SelectInput";
import SelectInputScope from "./contrast/SelectInputScope";
import SelectLoader from "./contrast/SelectLoader";
import SelectScope from "./contrast/SelectScope";
import MarkupSelectAsync from "./markupSchema/SelectAsync";

const Select: FC = () => (
  <>
    <SelectLoader />
    <SelectInput />
    <MarkupSelectAsync
      footer={
        <p>
          除了 <code>{"field.query({path}).value()"}</code> 添加依赖响应之外，还可以创建一个{" "}
          <code>observable.ref</code>{" "}
          对象，在被动联动模式中使用依赖响应对象，当响应对象的值更新后，也会再次出发响应操作
        </p>
      }
      header={
        <h2>
          通过 <code>observable.ref</code> 创建引用劫持响应式对象
        </h2>
      }
    />
    <SelectScope />
    <SelectInputScope />
  </>
);

export default Select;
