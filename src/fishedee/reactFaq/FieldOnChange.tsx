import { Form, createEffectHook, createForm, onFieldChange } from "@formily/core";
import { FC, useMemo } from "react";
import Wrapper from "../fieldAction/Wrapper";
import SchemaField from "./SchemaField";
import { FormConsumer } from "@formily/react";

const pushTips = createEffectHook("push-tips", (payload: string, form: Form) => {
    const { tips = "" } = form.values;
    const data = tips.split("\n").filter(Boolean);

    data.push(payload);
    form.values.tips = data.join("\n");
    return listener => listener();
});

const FieldOnChange: FC = () => {
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    pushTips(() => {});
                    onFieldChange("*(void1,void2,void3,void4,void5)", field => {
                        form.notify("push-tips", `${field.path.toString()} in form effect only one change`);
                    });
                },
            }),
        [],
    );
    return (
        <Wrapper
            footer={
                <div>
                    <p>
                        由于 React 机制，当组件发生 <code>onChange</code> 事件时会一层一层往上冒泡
                    </p>
                    <p>
                        文档错误的是，这个机制不区分 <code>component</code> 还是 <code>decorator</code>，即便在{" "}
                        <code>Field</code> 表单组件阻止冒泡仍旧无效
                    </p>
                    <p>好在所有表单都是单一组件，不存在包裹表单的表单组件</p>
                    <p>
                        但是对于组件内部如果有事件交互，而恰巧又是 <code>onChange</code>、<code>onInput</code>
                        ，这就可能会造成一个错误触发了，解决办法就是给表单外层再包一层来阻止相同事件的冒泡
                    </p>
                </div>
            }
            form={form}
            header={<h2>React.7.1: value与onChange的隐式传递</h2>}>
            <SchemaField>
                <SchemaField.Void
                    name="void1"
                    title="component 包裹 Field 受子集 onChange 影响"
                    x-component="VoidCom"
                    x-component-props={{ onChange: () => form.notify("push-tips", "void1 in children field change") }}>
                    <SchemaField.String name="input1" x-component="Input" />
                </SchemaField.Void>
                <SchemaField.Void
                    name="void2"
                    title="decorator 包裹 Field 受子集 onChange 影响"
                    x-decorator="VoidCom"
                    x-decorator-props={{ onChange: () => form.notify("push-tips", "void2 in children field change") }}>
                    <SchemaField.String name="input2" x-component="Input" />
                </SchemaField.Void>
                <SchemaField.Void
                    name="void3"
                    title="在组件内部阻止冒泡并不起作用"
                    x-decorator="VoidCom"
                    x-decorator-props={{ onChange: () => form.notify("push-tips", "void3 in children field change") }}>
                    <SchemaField.String
                        name="input3"
                        x-component="InputRaw"
                        x-component-props={{
                            onChange: e => {
                                e.preventDefault();
                                e.stopPropagation();
                                e.nativeEvent.stopImmediatePropagation();
                                console.log("bbbb");
                                return false;
                            },
                        }}
                    />
                </SchemaField.Void>
                <SchemaField.Void
                    name="void4"
                    title="解决办法"
                    x-decorator="VoidCom"
                    x-decorator-props={{ onChange: () => form.notify("push-tips", "void3 in children field change") }}>
                    <SchemaField.String
                        name="input4"
                        title="在 Field 的包装器组件 decorator 阻止冒泡"
                        x-component="Input"
                        x-decorator="VoidCom"
                    />
                </SchemaField.Void>
                <SchemaField.Void
                    name="void5"
                    title="在 Field 的 component 表单组件外层包一层，拦截相同事件冒泡"
                    x-decorator="VoidCom"
                    x-decorator-props={{ onChange: () => form.notify("push-tips", "void3 in children field change") }}>
                    <SchemaField.String name="input5" x-component="WraperInput" />
                </SchemaField.Void>
                <SchemaField.String
                    name="tips"
                    title="响应值"
                    x-component="Input.TextArea"
                    x-decorator="VoidCom"
                    x-component-props={{ rows: 8 }}
                />
            </SchemaField>
            <code className="consumer">
                <pre>
                    <FormConsumer>{({ values: { tips: _, ...data } }) => JSON.stringify(data, null, 2)}</FormConsumer>
                </pre>
            </code>
        </Wrapper>
    );
};

export default FieldOnChange;
