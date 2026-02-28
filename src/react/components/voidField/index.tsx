import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../../Panel";
import { Button, Space } from "antd";
import { Field, FormConsumer, VoidField } from "@formily/react";
import { Input } from "@formily/antd-v5";

const form = createForm();

const VoidFieldCom: FC = () => (
  <Panel
    footer={
      <div>
        <p>
          作为 <code>@formily/core</code> 的{" "}
          <a href="https://core.formilyjs.org/zh-CN/api/models/form#createvoidfield">
            createVoidField
          </a>{" "}
          React 实现，它是专门用于将 <code>ViewModel</code>{" "}
          与虚拟布局控件做绑定的桥接组件，可以用来控制数据型字段的显示隐藏，交互模式等，
          <code>VoidField</code> 组件属性参考{" "}
          <a href="https://core.formilyjs.org/zh-CN/api/models/form#ivoidfieldfactoryprops">
            IVoidFieldFactoryProps
          </a>
        </p>
        <p>
          该例子演示了如何用 <code>VoidField</code> 控制子节点显示隐藏，注意观察，
          <code>VoidField</code> 隐藏的时候，子节点的数据会同时被清空，因为 <code>visible</code> 为{" "}
          <code>false</code> 代表 <code>display</code> 为 <code>none</code>
          ，这种隐藏是不会保留字段值的。
        </p>
        <p>
          但是再次显示的时候，又会恢复现场，这里是 <code>Formily Core</code>{" "}
          内部的特性，支持完全恢复现场的能力。
        </p>
      </div>
    }
    form={form}
    header={
      <h2>
        <code>VoidField</code>
      </h2>
    }
  >
    <Space>
      <VoidField name="layout">
        <Field name="input" component={[Input]} />
      </VoidField>
      <FormConsumer>
        {() => (
          <Space>
            <Button
              onClick={() =>
                form
                  .query("layout")
                  .take()
                  ?.setState(state => {
                    state.visible = !state.visible;
                  })
              }
            >
              {form.query("layout").get("visible") ? "Hide" : "Visable"}
            </Button>
            <div>{JSON.stringify(form.values, null, 2)}</div>
          </Space>
        )}
      </FormConsumer>
    </Space>
  </Panel>
);

export default VoidFieldCom;
