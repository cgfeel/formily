import { Checkbox, FormGrid, FormItem } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import { Card, Input } from "antd";
import { FC, PropsWithChildren } from "react";
import SelectCollapse from "./com/SelectCollapse";
import ToolBar from "./com/ToolBar";
import UserCheckBox from "./com/UserCheckBox";
import ScrollWapper from "./com/ScrollWrapper";
import RecentRhoices from "./com/RecentChoices";
import UserMapRecord from "./com/UserMapRecord";
import TipTitle from "./com/TipTitle";
import SectionCollapse from "./components/SectionCollapse";
import { filterSection, reduceUserMap } from "./event";
import InputTest from "./components/Input";

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
        RecentRhoices,
        ScrollWapper,
        SectionCollapse,
        SelectCollapse,
        TipTitle,
        ToolBar,
        UserCheckBox,
        UserMapRecord,
        InputTest,
    },
    scope: {
        filterSection,
        reduceUserMap,
    },
});

export default SchemaField;
