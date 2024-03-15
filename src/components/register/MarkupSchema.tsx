import { createForm } from "@formily/core";
import { FC } from "react";
import Pannel from "./components/Pannel";
import SchemaFieldMarkup from "./components/SchemaFieldMarkup";

const form = createForm({
    validateFirst: true,
});

const MarkupSchema: FC = () => (
    <Pannel
        footer={
            <ul>
                <li>
                    <strong>组件：</strong>
                    <ul>
                        <li>
                            <code>ArrayItems</code>、<code>Cascader</code>、<code>DatePicker</code>、
                            <code>Editable</code>、<code>FormGrid</code>、<code>FormItem</code>、<code>FormLayout</code>
                            、<code>Password</code>、<code>Select</code>、自定义组件
                            <code>IDUpload</code>
                        </li>
                        <li>
                            <code>@formily/antd-v5</code>：组件的Api大部分可以查看文档
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>关联受控：</strong>
                    <ul>
                        <li>
                            作用域变量：<code>$deps</code>、<code>$self</code>
                        </li>
                        <li>
                            受控行为：<code>state</code>、<code>schema</code>
                        </li>
                        <li>路径查找：同级控件查找、子级控件查找</li>
                    </ul>
                </li>
                <li>
                    <code>SchemaField.Void</code>：虚拟节点，当前示例包含：
                    <ul>
                        <li>
                            充当<code>{"<Form.Item>"}</code>作为一个没有<code>name</code>的节点
                        </li>
                        <li>
                            充当交互组件：<code>ArrayItems</code>及其子组件、<code>Editable.Popover</code>
                        </li>
                    </ul>
                </li>
            </ul>
        }
        form={form}
        header={
            <h2>
                通过<code>Markup Schema</code>创建注册
            </h2>
        }>
        <SchemaFieldMarkup pwd={true} />
    </Pannel>
);

export default MarkupSchema;
