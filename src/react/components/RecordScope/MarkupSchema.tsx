import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../../Panel";
import SchemaField, { renderTmp } from "./SchemaField";

const form = createForm();

const MarkupSchema: FC = () => (
  <Panel
    footer={
      <div>
        <p>标准作用域注入组件，用于注入以下内置变量：</p>
        <ul>
          <li>
            <code>$record</code> 当前记录数据
          </li>
          <li>
            <code>$record.$lookup</code> 当前记录的父级记录，可以一直往上查找
          </li>
          <li>
            <code>record.$index</code> 当前记录的索引
          </li>
          <li>
            <code>$index</code> 当前记录索引，等同于 <code>$record.$index</code>
            ，考虑到记录数据如果不是对象，则需要独立读取
          </li>
          <li>
            <code>$lookup</code> 当前记录的父级记录，等同于 <code>$record.$lookup</code>
            ，考虑到记录数据如果不是对象，则需要独立读取
          </li>
        </ul>
        <p>
          和文档不同，演示通过 <code>RecordScope</code> + <code>scope</code> 实现，避免{" "}
          <code>eslint</code> 报错，也更方便实际使用
        </p>
        <p>
          <code>RecordScope</code> 和 <code>Expression</code> 的不同在于：
        </p>
        <ul>
          <li>
            <code>Expression</code> 用于自定义受控组件内部设置作用域变量
          </li>
          <li>
            <code>RecordScope</code> 用于不同字段之间层级传递数据
          </li>
        </ul>
        <p>使用约定：</p>
        <ul>
          <li>
            任何自增列表扩展组件，内部都应该使用 <code>RecordScope</code>
            ，用于传递记录作用域变量，目前已实现该约定的组件包括： <code>
              @formily/antd
            </code> 和 <code>@formily/next</code> 中的 <code>ArrayX</code> 系列的所有组件
          </li>
          <li>
            在 <code>@formily/antd</code> 中 <code>ArrayBase</code> 的 <code>Item</code> 用到了{" "}
            <code>RecordScope</code>，例如 <code>ArrayItems.Addition</code>、
            <code>ArrayItems.Remove</code> 通过 <code>record</code> 添加操作函数
          </li>
        </ul>
      </div>
    }
    form={form}
    header={
      <h2>
        <code>RecordScope</code> - MarkupSchema
      </h2>
    }
  >
    <SchemaField scope={{ renderTmp }}>
      <SchemaField.Void
        name="lookup_field"
        x-component="MyCustomComponent"
        x-component-props={{
          index: 1,
          record: { code: "Lookup Cood", name: "Lookup Name" },
        }}
      >
        <SchemaField.Void
          name="record_field"
          x-component="MyCustomComponent"
          x-component-props={{ index: 0, record: { code: "Code", name: "Name" } }}
        >
          <SchemaField.String
            name="index"
            x-component="Input.TextArea"
            x-decorator="FormItem"
            x-value="{{renderTmp($record, $lookup, $index)}}"
          />
        </SchemaField.Void>
      </SchemaField.Void>
    </SchemaField>
  </Panel>
);

export default MarkupSchema;
