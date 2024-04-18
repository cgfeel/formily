import { ArrayField as ArrayFieldType, createForm } from "@formily/core";
import { ArrayField, useField } from "@formily/react";
import { FC } from "react";
import Panel from "../../Panel";
import ArrayFieldTypeCom from "./ArrayFieldTypeCom";

const form = createForm();

const ArrayComponent: FC = () => {
    const field = useField<ArrayFieldType>();
    return <ArrayFieldTypeCom field={field} />;
};

const ArrayFieldCom: FC = () => (
    <Panel
        footer={
            <div>
                <p>
                    作为 <code>@formily/core</code> 的{" "}
                    <a href="https://core.formilyjs.org/zh-CN/api/models/form#createarrayfield">createArrayField</a>{" "}
                    React 实现，它是专门用于将 <code>ViewModel</code> 与输入控件做绑定的桥接组件，
                    <code>ArrayField</code>
                    组件属性参考{" "}
                    <a href="https://core.formilyjs.org/zh-CN/api/models/form#ifieldfactoryprops">IFieldFactoryProps</a>
                </p>
                <p>在当前演示中：</p>
                <ul>
                    <li>
                        通过 <code>ArrayField</code> 设置数组字段，并提供组件 <code>ArrayComponent</code>
                    </li>
                    <li>
                        组件 <code>ArrayComponent</code> 由 <code>observer</code> 包裹用于响应字段，并在内部通过{" "}
                        <code>useField</code> 获取当前的数组字段
                    </li>
                    <li>
                        最后由 <code>ArrayField</code> 字段对象提供增删，修改等操作
                    </li>
                </ul>
            </div>
        }
        form={form}
        header={
            <h2>
                <code>ArrayField</code> - 自定义组件用例
            </h2>
        }>
        <ArrayField name="array" component={[ArrayComponent]} />
    </Panel>
);

export default ArrayFieldCom;
