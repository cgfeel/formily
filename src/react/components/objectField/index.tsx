import { ObjectField as ObjectFieldType, createForm } from "@formily/core";
import { ObjectField, useField } from "@formily/react";
import { FC } from "react";
import Panel from "../../Panel";
import ObjectFieldTypeCom from "./ObjectFieldTypeCom";

const form = createForm();
const ObjectComponent: FC = () => {
  const field = useField<ObjectFieldType>();
  return <ObjectFieldTypeCom field={field} />;
};

const ObjectFieldCom: FC = () => (
  <Panel
    footer={
      <div>
        <p>
          作为 <code>@formily/core</code> 的{" "}
          <a href="https://core.formilyjs.org/zh-CN/api/models/form#createobjectfield">
            createObjectField
          </a>{" "}
          React 实现，它是专门用于将 <code>ViewModel</code> 与输入控件做绑定的桥接组件，
          <code>ObjectField</code> 组件属性参考{" "}
          <a href="https://core.formilyjs.org/zh-CN/api/models/form#ifieldfactoryprops">
            IFieldFactoryProps
          </a>
        </p>
        <p>
          执行顺序见 <code>ArrayField</code>。在演示中，添加字段通过 <code>basePath</code> 将原本为{" "}
          <code>object.propertyName</code> 的字段挂载到根目录，为 <code>propertyName</code>
          ，这样既不用更改字段所属位置，而实现字段自定义挂靠路径
        </p>
      </div>
    }
    form={form}
    header={
      <h2>
        <code>ObjectField</code> - 自定义组件用例
      </h2>
    }
  >
    <ObjectField name="object" component={[ObjectComponent]} />
  </Panel>
);

export default ObjectFieldCom;
