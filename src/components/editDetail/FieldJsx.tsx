import { createForm } from "@formily/core";
import { FC } from "react";
import Wrapper from "./Wrapper";
import FieldCom from "../register/components/FieldCom";

const form = createForm({
    validateFirst: true,
});

const FieldJsx: FC = () => (
    <Wrapper
        footer={
            <div>
                <p>巩固：</p>
                <ul>
                    <li>
                        无论组件怎么拆分，每个表单声明<code>createForm</code>一定要单独一个文件
                    </li>
                    <li>
                        在组件中可以通过<code>useField</code>这个 Hooks 获取当前表单编辑状态，但仅限于在
                        <code>Field</code>系列组件中， 能够接收<code>component</code> 这个 props 作为子组件的内部子组件
                    </li>
                    <li>
                        对于<code>ArrayBase</code>这种无法被<code>ArrayField</code>作为<code>component</code> props
                        包裹的组件，以及<code>Schema</code> 以外的 <code>React</code> 组件可以通过消费{" "}
                        <code>FormConsumer</code> 实时获取状态
                    </li>
                </ul>
            </div>
        }
        form={form}
        header={
            <h2>
                通过<code>JSX</code>编辑详情
            </h2>
        }>
        <FieldCom />
    </Wrapper>
);

export default FieldJsx;
