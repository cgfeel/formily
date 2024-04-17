import {
    FormPath,
    createForm,
    registerValidateFormats,
    registerValidateLocale,
    registerValidateMessageTemplateEngine,
} from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import TabList from "../TabList";

registerValidateFormats({ custom_format: /123/ });
registerValidateLocale({
    "zh-CN": {
        required: "请输入<% text %>",
        custom_format: "自定义的提示：<% text %>",
    },
});

registerValidateMessageTemplateEngine((message, context) => {
    return String(message).replace(/<%\s*([\w.]+)\s*%>/g, (_, $0) => {
        console.log(message, context, $0);
        return FormPath.getIn(context, $0);
    });
});

const form = createForm();

const RegisterValidateMessageTemplateEngine: FC = () => (
    <TabList>
        <Panel
            footer={
                <div>
                    <p>全局注册校验消息模板引擎，我们在校验器中返回校验消息的时候，可以基于模板引擎语法做转换</p>
                    <p>
                        <code>registerValidateMessageTemplateEngine</code> 接受 2 个参数：
                    </p>
                    <ol>
                        <li>第1个参数是模板</li>
                        <li>
                            第2个参数是字段对象，可以通过 <code>FormPath</code> 获取对应的值，通过 <code>replace</code>{" "}
                            进行替换
                        </li>
                    </ol>
                    <p>在字段中使用模板：</p>
                    <ul>
                        <li>
                            <code>x-validator</code> 中使用内置格式，或通过 <code>registerValidateFormats</code>{" "}
                            注册自定义格式
                        </li>
                        <li>除此之外还需要添加一个模板中对应变量名的属性，它的值将作为替换内容</li>
                        <li>需要注意的是，如果有多个规则，请用数组的形式，每个规则单独一个对象避免混淆</li>
                    </ul>
                </div>
            }
            form={form}
            header={
                <h2>
                    <code>registerValidateMessageTemplateEngine</code>
                </h2>
            }>
            <SchemaField>
                <SchemaField.String
                    name="input"
                    title="输入框"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-validator={{
                        required: true,
                        text: "your custom text",
                    }}
                />
                <SchemaField.String
                    name="input-2"
                    title="输入框"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-validator={[
                        {
                            format: "custom_format",
                            text: "错误❎",
                        },
                        {
                            required: true,
                            text: "your second text",
                        },
                    ]}
                />
            </SchemaField>
        </Panel>
    </TabList>
);

export default RegisterValidateMessageTemplateEngine;
