import { FC } from "react";
import Panel from "../Panel";
import { Field, FormProvider } from "./Context";
import Input from "./Input";
import Password from "./Password";
import { data } from "./server";

const CoreReactive: FC = () => (
    <Panel
        footer={
            <div>
                <p>思路主要是：</p>
                <ul>
                    <li>
                        将表单的<code>errors</code>，<code>component</code>，<code>componentProps</code>，
                        <code>decorator</code>，<code>decoratorProps</code> 全部纳入 <code>Observable</code>{" "}
                        的管理中。这使得我们可以轻松地通过更改 <code>Observable</code> 的字段，来更新页面。
                    </li>
                    <li>
                        将自定义组件，用 <code>value</code> 与 <code>onChange</code>
                        ，设计为受控组件，而且是表单项UI的约定接口，这使得复用不同的UI组件，或者自定义UI组件更加简单。
                    </li>
                    <li>
                        <code>Field</code> 组件在被多层 <code>div</code> 嵌套底下依然能正常使用，换句话说，使用{" "}
                        <code>FormProvider</code>，并没有限制 <code>Field</code> 组件的排版。
                        <ol>
                            <li>
                                <code>Field</code> 组件，通过 <code>FormContext</code> 来获取当前的 <code>Form</code>
                            </li>
                            <li>
                                使用自身的 <code>key</code> 属性获取自己所属的 <code>Field</code> 字段
                            </li>
                            <li>
                                <code>FormItem</code> 组件使用 <code>FieldContext</code> 来获取自己所属的{" "}
                                <code>Field</code>
                            </li>
                        </ol>
                    </li>
                    <li>
                        在 <code>onInput</code> 的输入中，进行各个字段的校验
                    </li>
                    <li>
                        使用 <code>autorun</code> 来实现，自动化的数据联动
                    </li>
                </ul>
                <p>问题：</p>
                <ul>
                    <li>
                        每个表单的字段都需要重复写 <code>title</code>，<code>Component</code>，<code>errors</code>，
                        <code>visible</code>，<code>onInput</code>，<code>formily</code> 通过 <code>schema</code> 实现
                    </li>
                    <li>
                        需要同时控制 <code>age</code> 与 <code>name</code> 两个字段，显然现在这种做法还做不到
                    </li>
                    <li>
                        需要用户手动去调用 <code>Validator</code> 的函数
                    </li>
                    <li>
                        <code>autorun</code> 能实现被动的数据联动，还需要有主动的数据联动的支持
                    </li>
                    <li>应该提供表单的状态进行持久化的方法</li>
                    <li>表单里面应该还支持嵌套表单，嵌套对象编辑的情况</li>
                    <li>表单的初始值怎样导入</li>
                    <li>缺少表单对象的反馈</li>
                </ul>
            </div>
        }
        header={
            <h2>
                core.0：仅用 <code>@formily/reactive</code> 实现表单逻辑
            </h2>
        }>
        <FormProvider form={data}>
            <button
                onClick={() => {
                    const { componentProps } = data.name;
                    const index = componentProps.placeholder?.indexOf("你是谁") ?? 0;
                    componentProps.placeholder = index > -1 ? "我是谁" : "你是谁";
                }}>
                切换 name 组件的 {"componentProps[placeholder]"}
            </button>
            <Field name="name" />
            <Field name="nameLength" />
            <button
                onClick={() => {
                    const { decoratorProps } = data.age;
                    const { style = {} } = decoratorProps;
                    decoratorProps.style = {
                        ...style,
                        backgroundColor: style.backgroundColor === "#eee" ? void 0 : "#eee",
                    };
                }}>
                切换 age 组件的 {"decoratorProps[style.background]"}
            </button>
            <Field name="age" />
            <button
                onClick={() => {
                    const { component } = data.password;
                    data.password.component = component === Password ? Input : Password;
                }}>
                切换 password 组件的 Component
            </button>
            <Field name="password" />
        </FormProvider>
    </Panel>
);

export default CoreReactive;
