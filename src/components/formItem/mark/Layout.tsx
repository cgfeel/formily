import { createForm } from "@formily/core";
import { ConfigProvider, Radio } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { FC, PropsWithChildren, useState } from "react";
import Panel from "../Panel";
import FormLayout from "../../formLayout/form-layout";

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
                            在 <code>antd v5</code> 文档中中已剔除这项功能，在此将其修复
                        </p>
                        <p>
                            由于这次修复涉及到样式，所以特此将 <code>FormItem</code>{" "}
                            作为默认项优先展示，否则会被同名的样式覆盖
                        </p>
                    </div>
                }
                form={form}
                header={<h2>必填样式</h2>}>
                <FormLayout shallow={true} requiredMark={requiredMark}>
                    {children}
                </FormLayout>
            </Panel>
        </ConfigProvider>
    );
};

type RequireType = boolean | "optional";

export default Layout;
