import { Alert, Tabs, TabsProps } from "antd";
import { FC } from "react";
import DialogDrawer from "../../page/DialogDrawer";
import StepForm from "../../page/StepForm";
import TabCollapse from "../../page/TabCollapse";

const items: TabsProps["items"] = [
    {
        key: "dialog-drawer",
        label: "2.1-2.2: 弹窗与抽屉",
        children: <DialogDrawer />,
    },
    {
        key: "step-form",
        label: "2.3: 分步表单",
        children: <StepForm />,
    },
    {
        key: "tab-collapse",
        label: "2.4-2.5: 选项卡、折叠表单",
        children: <TabCollapse />,
    },
];

const AntdReact: FC = () => (
    <>
        <Alert message="这部分全部来自官方文档" type="warning" />
        <Tabs items={items} />
    </>
);

export default AntdReact;
