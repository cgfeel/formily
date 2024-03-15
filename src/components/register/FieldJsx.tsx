import { createForm } from "@formily/core";
import { FC } from "react";
import Pannel from "./components/Pannel";
import FieldCom from "./components/FieldCom";

const form = createForm({
    validateFirst: true,
});

const FieldJsx: FC = () => (
    <Pannel
        footer={
            <div>
                <p>
                    在 <code>Jsx</code> 的自增控件中查找当前路径通过 <code>{"[]"}</code>，如 <code>{".[].name"}</code>
                </p>
                <div>
                    <p>
                        <code>ArrayItems</code> 自增组件只适用于 <code>Schema</code> 场景，因此这里采用{" "}
                        <code>ArrayField</code> + <code>ArrayBase</code>，存在以下几个问题：
                    </p>
                    <ul>
                        <li>不支持拖拽</li>
                        <li>
                            如果添加校验规则<code>ArrayField</code> 匹配不到 <code>ArrayBase</code>
                            ，抛出的错误又无法被 <code>Form</code> 捕获，因此这种情况建议使用 <code>Schema</code> 场景
                        </li>
                    </ul>
                </div>
            </div>
        }
        form={form}
        header={
            <h2>
                通过<code>Jsx</code>创建注册
            </h2>
        }>
        <FieldCom pwd={true} />
    </Pannel>
);

export default FieldJsx;
