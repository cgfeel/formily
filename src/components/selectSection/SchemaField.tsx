import { Checkbox, FormGrid } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import { Card, Input } from "antd";
import { FC, PropsWithChildren } from "react";
import SelectCollapse from "./com/SelectCollapse";
import ToolBar from "./com/ToolBar";

const { GridColumn } = FormGrid;
const CardHeader: FC = ({ children }: PropsWithChildren) => (
    <div className="ant-card-topbar">
        <div className="ant-card-head-wrapper">
            <div className="ant-card-head-title">{children}</div>
        </div>
    </div>
);

const SchemaField = createSchemaField({
    components: {
        Card,
        CardHeader,
        Checkbox,
        FormGrid,
        GridColumn,
        Input,
        SelectCollapse,
        ToolBar,
    },
});

export default SchemaField;
