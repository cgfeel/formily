import { Checkbox, FormGrid, FormItem } from "@formily/antd-v5";
import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import { createSchemaField } from "@formily/react";
import { Card, Input } from "antd";
import cls from "classnames";
import { FC, PropsWithChildren } from "react";
import SelectCollapse from "./com/SelectCollapse";
import ToolBar from "./com/ToolBar";
import UserCheckBox from "./com/UserCheckBox";
import UserGroup from "./com/UserGroup";
import useCollapseStyle from "./styles/collapse";

const { GridColumn } = FormGrid;
const CardHeader: FC = ({ children }: PropsWithChildren) => (
    <div className="ant-card-topbar">
        <div className="ant-card-head-wrapper">
            <div className="ant-card-head-title">{children}</div>
        </div>
    </div>
);

const PanelStop: FC<PropsWithChildren> = ({ children }) => {
    const prefixCls = usePrefixCls("collapse");
    const [wrapSSR, hashId] = useCollapseStyle(prefixCls);
    return wrapSSR(
        <div className={cls(`${prefixCls}-group`, hashId)} onClick={event => event.stopPropagation()}>
            {children}
        </div>,
    );
};

const SchemaField = createSchemaField({
    components: {
        Card,
        CardHeader,
        Checkbox,
        FormGrid,
        FormItem,
        GridColumn,
        Input,
        PanelStop,
        SelectCollapse,
        ToolBar,
        UserGroup,
        UserCheckBox,
    },
});

export default SchemaField;
