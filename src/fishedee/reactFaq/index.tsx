import { Alert, Tabs, TabsProps } from "antd";
import { FC } from "react";
import ClearFormGraph from "../../components/controlled/schemaControlled/ClearFormGraph";
import Select from "../../components/select";
import SelectScope from "../../components/select/contrast/SelectScope";
import EffectError from "./EffectError";
import FieldOnChange from "./FieldOnChange";
import FieldState from "./fieldState";

const items: TabsProps["items"] = [
    {
        key: "field",
        label: "7.1-7.3: 字段和生命周期",
        children: (
            <>
                <FieldOnChange />
                <SelectScope
                    footer={
                        <div>
                            <p>
                                文档错误之一：<code>scope</code> 在 <code>reaction</code> 中默认将 <code>Field</code>{" "}
                                传过去
                            </p>
                            <p>
                                即便是 <code>click</code>，该用就用，因为 <code>onFieldReact</code> 也不响应{" "}
                                <code>click</code>
                                ，大不了将 <code>$self</code>、<code>$deps</code> 传递过去
                            </p>
                        </div>
                    }
                    header={
                        <h2>
                            React.7.2: 使用 <code>scope</code>
                        </h2>
                    }
                />
                <EffectError />
            </>
        ),
    },
    {
        key: "data-source",
        label: "7.4: Field 的 dataSource",
        children: (
            <>
                <Alert
                    message="文档讲述了 Field 怎么同步设置 dataSource，建议从官方文档了解，分别展示了同步和异步加载"
                    type="warning"
                />
                <Select />
                <Alert message="除此之外，如果要实现字段切换可以通过 form.clearFormGraph" type="warning" />
                <ClearFormGraph />
            </>
        ),
    },
    {
        key: "field-change",
        label: "7.5: Field 状态设置和响应",
        children: (
            <>
                <FieldState />
            </>
        ),
    },
];

const ReactFaq: FC = () => <Tabs items={items} />;

export default ReactFaq;
