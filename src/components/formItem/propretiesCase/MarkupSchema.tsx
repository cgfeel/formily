import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";
import { FC } from "react";
import Panel from "../Panel";
import ComponentIndex from "./ComponentIndex";

const form = createForm();
const SchemaField = createSchemaField();

const MarkupSchema: FC = () => (
  <Panel
    footer={
      <p>
        这里我将 <code>components</code> 也通过 <code>props</code> 的方式动态派发给{" "}
        <code>schema</code>
        ，其用途和初始赋值是一样的，区别是动态添加的组件在使用时没有提示信息
      </p>
    }
    form={form}
    width={800}
    header={
      <h2>
        <code>FormItem</code> 常用属性案例
      </h2>
    }
  >
    <SchemaField components={ComponentIndex}>
      <SchemaField.Void x-component="Title" x-component-props={{ text: "label 为空的展示" }} />
      <SchemaField.String
        description="由于这里没有 `title`，所以 `labelWidth: 300` 这个 `Props` 也不会生效"
        x-component="Input"
        x-decorator="FormItem"
        x-decorator-props={{ labelWidth: 300 }}
      />
      <SchemaField.String
        description="由于这里 `title` 是空字符，所以 `labelWidth: 300` 这个 `Props` 也不会生效"
        title=""
        x-component="Input"
        x-decorator="FormItem"
        x-decorator-props={{ labelWidth: 300 }}
      />
      <SchemaField.Void x-component="Title" x-component-props={{ text: "冒号" }} />
      <SchemaField.String
        description="`antd` 表单的提示用 `help` 或 `extra`，`formily`则使用 `description`(等同`extra`) 或 `feedbackText`"
        title="默认"
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        title="无冒号(colon=false)"
        x-component="Input"
        x-decorator="FormItem"
        x-decorator-props={{
          colon: false,
        }}
      />
      <SchemaField.Void x-component="Title" x-component-props={{ text: "固定宽带设置" }} />
      <SchemaField.String
        title="固定 label 宽度(labelWidth)"
        x-component="Input"
        x-decorator="FormItem"
        x-decorator-props={{
          labelWidth: 300,
        }}
      />
      <SchemaField.String
        description="当提示布局为 `tooltipLayout: text` 时，提示信息将和 `title` 一起作为提示"
        title="固定 label 宽度(labelWidth)溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出"
        x-component="Input"
        x-decorator="FormItem"
        x-decorator-props={{
          labelWidth: 300,
          tooltip: "提示提示",
          tooltipLayout: "text",
        }}
      />
      <SchemaField.String
        description="`wrapperWidth` 作为包裹表单的元素宽度，不包含 `description` 和 `label`"
        title="固定内容宽度(wrapperWidth)"
        x-component="Input"
        x-decorator="FormItem"
        x-decorator-props={{
          labelWidth: 300,
          wrapperWidth: 300,
        }}
      />
      <SchemaField.Void x-component="Title" x-component-props={{ text: "对齐方式设置" }} />
      <SchemaField.String
        title="label左对齐(labelAlign=left)"
        x-component="Input"
        x-decorator="FormItem"
        x-decorator-props={{
          labelWidth: 300,
          labelAlign: "left",
        }}
      />
      <SchemaField.String
        title="label右对齐(labelAlign=right默认)"
        x-component="Input"
        x-decorator="FormItem"
        x-decorator-props={{
          labelWidth: 300,
          labelAlign: "right",
        }}
      />
      <SchemaField.String
        title="内容左对齐(wrapperAlign=left默认)"
        x-component="Input"
        x-decorator="FormItem"
        x-decorator-props={{
          labelWidth: 300,
          wrapperAlign: "left",
          wrapperWidth: 300,
        }}
      />
      <SchemaField.String
        title="内容右对齐(wrapperAlign=right)"
        x-component="Input"
        x-decorator="FormItem"
        x-decorator-props={{
          labelWidth: 300,
          wrapperAlign: "right",
          wrapperWidth: 300,
        }}
      />
      <SchemaField.String
        title="tooltip"
        x-component="Input"
        x-decorator="FormItem"
        x-decorator-props={{
          tooltip: "tooltip",
        }}
      />
      <SchemaField.Void x-component="Title" x-component-props={{ text: "是否撑满" }} />
      <SchemaField.String
        description="目前来看无论是否设置撑满都一样，包括官方示例"
        title="默认不撑满(fullness=false)"
        x-component="Select"
        x-decorator="FormItem"
        enum={[
          { label: "男", value: 1 },
          { label: "女", value: 2 },
        ]}
      />
      <SchemaField.String
        title="撑满(fullness=true)"
        x-component="Select"
        x-decorator="FormItem"
        enum={[
          { label: "男", value: 1 },
          { label: "女", value: 2 },
        ]}
        x-decorator-props={{
          fullness: true,
        }}
      />
      <SchemaField.Void x-component="Title" x-component-props={{ text: "辅助信息" }} />
      <SchemaField.String
        description="当设置 `wrapperWidth` 时 `labelCol` 将会失效"
        title="必填信号"
        x-component="Input"
        x-decorator="FormItem"
        x-decorator-props={{
          asterisk: true,
          labelCol: 6,
          wrapperWidth: 300,
        }}
      />
      <SchemaField.String
        title="前缀"
        x-component="Input"
        x-decorator="FormItem"
        x-decorator-props={{
          addonBefore: "addonBefore",
          labelCol: 6,
          wrapperCol: 10,
        }}
      />
      <SchemaField.String
        title="后缀"
        x-component="Input"
        x-decorator="FormItem"
        x-decorator-props={{
          addonAfter: "addonAfter",
          labelCol: 6,
          wrapperCol: 10,
        }}
      />
      <SchemaField.String
        title="帮助信息feedbackText"
        x-component="Input"
        x-decorator="FormItem"
        x-decorator-props={{
          feedbackText:
            "`feedbackText`：限制内容宽度的时候`feedbackText`将不在限制范围内，但通过 `wrapperCol` 限定内容占比的时候，也同样限制提示信息，如下面的表单所示",
          labelCol: 6,
          wrapperWidth: 300,
        }}
      />
      <SchemaField.String
        description="desc"
        title="额外信息fextra"
        x-component="Input"
        x-decorator="FormItem"
        x-decorator-props={{
          extra: "`extra`：在和 `description` 一起使用的时候会覆盖其值",
          feedbackText: "`feedbackText`：和 `extra`一起使用的时候，会展示在其上方",
          labelCol: 6,
          wrapperCol: 10,
        }}
      />
    </SchemaField>
  </Panel>
);

export default MarkupSchema;
