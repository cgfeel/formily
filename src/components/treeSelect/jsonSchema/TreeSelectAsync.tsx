import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { createStyles, css } from "antd-style";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import asyncSearch from "../action/asyncSearch";

const form = createForm({ effects: asyncSearch });
const useStyles = createStyles(css`
  max-height: 400px;
  overflow: auto;
`);

const schema: ISchema = {
  type: "object",
  properties: {
    select: {
      required: true,
      title: "异步选择框",
      type: "string",
      "x-component": "TreeSelect",
      "x-decorator": "FormItem",
      enum: [
        { id: 1, pId: 0, value: "1", title: "Expand to load" },
        { id: 2, pId: 0, value: "2", title: "Expand to load" },
        { id: 3, pId: 0, value: "3", title: "Tree Node", isLeaf: true },
      ],
      "x-component-props": {
        allowClear: true,
        placeholder: "Please Select",
        popupClassName: "{{styles}}",
        treeDataSimpleMode: true,
      },
    },
  },
};

const TreeSelectAsync: FC = () => {
  const { styles } = useStyles();
  return (
    <Panel
      form={form}
      header={
        <h2>
          <code>Json Schema</code> 异步加载数据源案例
        </h2>
      }
    >
      <SchemaField schema={schema} scope={{ styles }} />
    </Panel>
  );
};

export default TreeSelectAsync;
