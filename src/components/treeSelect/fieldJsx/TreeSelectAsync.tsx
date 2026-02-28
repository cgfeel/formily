import { TreeSelect } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { createStyles, css } from "antd-style";
import { Field } from "@formily/react";
import { FC } from "react";
import FormItem from "../../formItem/form-item";
import Panel from "../Panel";
import asyncSearch from "../action/asyncSearch";

const form = createForm({ effects: asyncSearch });
const useStyles = createStyles(css`
  max-height: 400px;
  overflow: auto;
`);

const TreeSelectAsync: FC = () => {
  const { styles } = useStyles();
  return (
    <Panel
      form={form}
      header={
        <h2>
          <code>Field Jsx</code> 异步加载数据源案例
        </h2>
      }
    >
      <Field
        name="select"
        title="异步选择框"
        component={[
          TreeSelect,
          {
            allowClear: true,
            placeholder: "Please Select",
            popupClassName: styles,
            treeDataSimpleMode: true,
          },
        ]}
        dataSource={[
          { id: 1, pId: 0, value: "1", title: "Expand to load" },
          { id: 2, pId: 0, value: "2", title: "Expand to load" },
          { id: 3, pId: 0, value: "3", title: "Tree Node", isLeaf: true },
        ]}
        decorator={[FormItem]}
        required
      />
    </Panel>
  );
};

export default TreeSelectAsync;
