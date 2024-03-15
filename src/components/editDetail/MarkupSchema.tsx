import { createForm } from "@formily/core";
import { FC } from "react";
import SchemaFieldMarkup from "../register/components/SchemaFieldMarkup";
import Wrapper from "./Wrapper";

const form = createForm({
    validateFirst: true,
    editable: false,
});

const MarkupSchema: FC = () => (
    <Wrapper
        footer={
            <div>
                <p>
                    通过组件<code>PreviewText.Placeholder</code>实现预览，有 3 点文档没有提到：
                </p>
                <ol>
                    <li>
                        默认开启预览需要通过<code>createForm</code>，将<code>editable</code>设置为 <code>false</code>
                    </li>
                    <li>
                        否则通过 <code>createForm</code> 拿到的<code>form</code>对象设置可编辑状态<code>setState</code>
                    </li>
                    <li>
                        表单控件可以通过受控的方式获取当前编辑状态并调整状态，见当前表单<code>姓名</code>节点
                    </li>
                </ol>
            </div>
        }
        form={form}
        header={
            <h2>
                通过<code>Markup Schema</code>编辑详情
            </h2>
        }>
        <SchemaFieldMarkup />
    </Wrapper>
);

export default MarkupSchema;
