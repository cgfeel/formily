import { FormLayout } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { ConfigProvider, Radio } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { FC, PropsWithChildren, useState } from "react";
import Panel from "../Panel";
// import FormLayout from "../../formLayout/form-layout";

const form = createForm();

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [requiredMark, setRequiredMask] = useState<RequireType>(true);
    return (
        <ConfigProvider locale={zhCN}>
            <Panel
                extra={
                    <div style={{ marginBottom: 20 }}>
                        Required Mark:
                        <Radio.Group value={requiredMark} onChange={e => setRequiredMask(e.target.value)}>
                            <Radio.Button value="optional">optional</Radio.Button>
                            <Radio.Button value={true}>true</Radio.Button>
                            <Radio.Button value={false}>false</Radio.Button>
                        </Radio.Group>
                    </div>
                }
                footer={
                    <div>
                        <p>
                            这里有一个问题：<code>requiredMark</code> 无效，查看了 <code>git</code>{" "}
                            仓库代码是正确的，那么这个问题很有可能是发布的版本和仓库版本不一致；
                        </p>
                        <p>
                            查看了官方文档，这部分为 <code>antd v4</code>提供的功能，在 <code>antd v5</code>{" "}
                            中已剔除，目前 <code>antd v5</code> 不支持布局必填样式
                        </p>
                    </div>
                }
                form={form}
                header={<h2>必填样式</h2>}>
                <FormLayout shallow={true} requiredMark={false}>
                    {children}
                </FormLayout>
            </Panel>
        </ConfigProvider>
    );
};

declare module "@formily/antd-v5" {
    export interface IFormLayoutProps extends PickMaskInstance {}
    export interface IFormItemProps extends PickMaskInstance {}
}

interface PickMaskInstance {
    requiredMark?: RequireType;
}

type RequireType = boolean | "optional";

export default Layout;
