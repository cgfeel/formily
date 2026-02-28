import { createForm, onFieldValueChange } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import { asyncVisible } from "../server";

const form = createForm({
  effects: () => {
    onFieldValueChange("select", field => asyncVisible(field));
  },
});

const AsyncEffect: FC = () => (
  <Panel
    footer={
      <div>
        <p>
          总结：①设置字段状态是可以接受异步函数；②由于是异步函数所以监控的组件默认隐藏{" "}
          <code>{"x-visible={false}"}</code>，待得到响应值后再反馈状态
        </p>
        <p>由于本地请求响应非常快，请以开发工具网络请求作为参考依据</p>
      </div>
    }
    form={form}
    header={
      <h2>
        异步联动：<code>Effects</code> 用例
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.String
        default="visible"
        name="select"
        title="控制者"
        x-component="Select"
        x-decorator="FormItem"
        enum={[
          { label: "显示", value: "visible" },
          { label: "隐藏", value: "none" },
          { label: "隐藏-保留值", value: "hide" },
        ]}
      />
      <SchemaField.String
        name="input"
        title="受控者"
        x-component="Input"
        x-decorator="FormItem"
        x-visible={false}
      />
    </SchemaField>
  </Panel>
);

export default AsyncEffect;
