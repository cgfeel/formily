import { Checkbox, FormGrid, FormItem } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import { Card, Input } from "antd";
import { FC, PropsWithChildren } from "react";
import SelectCollapse from "./com/SelectCollapse";
import ToolBar from "./com/ToolBar";
import UserCheckBox from "./com/UserCheckBox";
import UserGroup from "./com/UserGroup";
import useCollapseStyle from "./styles/collapse";
import ScrollWapper from "./com/ScrollWrapper";

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
        FormItem,
        GridColumn,
        Input,
        ScrollWapper,
        SelectCollapse,
        ToolBar,
        UserGroup,
        UserCheckBox,
    },
});

export default SchemaField;
