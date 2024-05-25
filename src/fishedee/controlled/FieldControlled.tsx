import { createForm, isField, onFieldReact } from "@formily/core";
import { observable } from "@formily/reactive";
import { FC } from "react";
import Wrapper from "../fieldAction/Wrapper";
import { Field } from "@formily/react";
import { FormItem, Input } from "@formily/antd-v5";

const obs = observable<Partial<Record<string, string>>>({
    name: "kk",
});

const form = createForm({
    values: obs,
    effects: () => {
        onFieldReact("name", field => isField(field) && obs.age !== void 0 && field.setValue(obs.age));
        onFieldReact("age", field => isField(field) && obs.name !== void 0 && field.setValue(obs.name));
    },
});

const FieldControlled: FC = () => {
    return (
        <Wrapper
            footer={
                <div>
                    <p>
                        在 <code>formily</code>中响应的 <code>observable</code> 对象是一个 <code>proxy</code> 对象，通过{" "}
                        <code>get/set</code> 收集依赖，在 <code>fish</code> 文档中单个 <code>onFieldReact</code>{" "}
                        只收集一个依赖：<code>field.value = obs.name</code>，当然无法相互联动，解决办法是再增加一条{" "}
                        <code>onFieldReact</code>
                    </p>
                    <p>
                        下面提供一个响应值更优解，注意：这里用到的两个案例都脱离了 <code>schema</code>，在{" "}
                        <code>schema</code> 中本身就是双向绑定的无需额外考虑，这里演示的目的是为了说明{" "}
                        <code>observable</code> 对象在表单联动时的双向受控
                    </p>
                </div>
            }
            form={form}
            header={<h2>字段联动</h2>}>
            <Field name="name" title="name" component={[Input]} decorator={[FormItem]} />
            <Field name="age" title="age" component={[Input]} decorator={[FormItem]} />
        </Wrapper>
    );
};

export default FieldControlled;
