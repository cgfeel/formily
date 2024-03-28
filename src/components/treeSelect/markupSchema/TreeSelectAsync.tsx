import { createForm } from "@formily/core";
import { createStyles, css } from "antd-style";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import asyncSearch from "../action/asyncSearch";

const form = createForm({ effects: asyncSearch });
const useStyles = createStyles(css`
    maxheight: 400px;
    overflow: auto;
`);

const TreeSelectAsync: FC = () => {
    const { styles } = useStyles();
    return (
        <Panel
            form={form}
            header={
                <h2>
                    <code>Markup Schema</code> 异步联动数据源案例
                </h2>
            }>
            <SchemaField>
                <SchemaField.String
                    name="select"
                    title="异步选择框"
                    x-component="TreeSelect"
                    x-decorator="FormItem"
                    enum={[
                        { id: 1, pId: 0, value: "1", title: "Expand to load" },
                        { id: 2, pId: 0, value: "2", title: "Expand to load" },
                        { id: 3, pId: 0, value: "3", title: "Tree Node", isLeaf: true },
                    ]}
                    x-component-props={{
                        allowClear: true,
                        placeholder: "Please Select",
                        popupClassName: styles,
                        treeDataSimpleMode: true,
                    }}
                />
            </SchemaField>
        </Panel>
    );
};

export default TreeSelectAsync;
