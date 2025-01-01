import { Checkbox, FormGrid, FormItem } from "@formily/antd-v5";
import { createSchemaField, RecordScope, useExpressionScope } from "@formily/react";
import { Card, Input } from "antd";
import { FC, PropsWithChildren } from "react";
import SelectCollapse from "./com/SelectCollapse";
import CheckedAll from "./com/CheckedAll";
import UserCheckBox from "./com/UserCheckBox";
import useCollapseStyle from "./styles/collapse";
import ScrollWapper from "./com/ScrollWrapper";
import { SectionItem } from "./hooks/useFakeService";
import UserMapRecord from "./com/UserMapRecord";

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
        CheckedAll,
        FormGrid,
        FormItem,
        GridColumn,
        Input,
        ScrollWapper,
        SelectCollapse,
        UserCheckBox,
        UserMapRecord,
    },
});

export default SchemaField;
