import { CheckCircleFilled, LoadingOutlined } from "@ant-design/icons";
import { createForm } from "@formily/core";
import { createStyles } from "antd-style";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "./SchemaField";

const useStyles = createStyles(
    ({ prefixCls, token, css }) => css`
        & .${prefixCls}icon-check-circle {
            color: ${token.colorSuccess};
        }
        & .${prefixCls}icon-loading {
            color: ${token.colorPrimary};
        }
    `,
);

const feedBackSuccess = { feedbackIcon: <CheckCircleFilled />, feedbackStatus: "success" };
const form = createForm();

const verticalForm = [
    "Select",
    "DatePicker",
    "DatePicker.RangePicker",
    "DatePicker.YearPicker",
    "DatePicker.MonthPicker",
    "DatePicker.TimePicker",
    "NumberPicker",
    "TreeSelect",
    "Cascader",
];

const MarkupSchema: FC = () => {
    const { styles } = useStyles();
    return (
        <Panel width={800} className={styles} form={form} header={<h2>反馈信息定制案例</h2>}>
            <SchemaField>
                <SchemaField.String
                    description="description"
                    name="input1"
                    title="错误状态(feedbackStatus=error)"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-decorator-props={{ feedbackStatus: "error" }}
                />
                <SchemaField.String
                    description="description"
                    name="input2"
                    title="警告状态(feedbackStatus=warning)"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-decorator-props={{ feedbackStatus: "warning" }}
                />
                <SchemaField.String
                    description="description"
                    name="input3"
                    title="成功状态(feedbackStatus=sussess)"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-decorator-props={feedBackSuccess}
                />
                <SchemaField.String
                    description="description"
                    name="input4"
                    title="加载状态(feedbackStatus=pending)"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-decorator-props={{ feedbackIcon: <LoadingOutlined />, feedbackStatus: "pending" }}
                />
                <SchemaField.Void x-component="Title" x-component-props={{ text: "反馈信息的布局" }} />
                <SchemaField.String
                    name="input5"
                    title="紧凑模式required"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-decorator-props={{ feedbackLayout: "terse" }}
                    required
                />
                <SchemaField.String
                    name="input6"
                    title="紧凑模式有feedback(feedbackLayout=terse)"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-decorator-props={{
                        feedbackLayout: "terse",
                        feedbackStatus: "error",
                        feedbackText: "error message",
                    }}
                />
                <SchemaField.String
                    name="input7"
                    title="紧凑模式无feedback(feedbackLayout=terse)"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-decorator-props={{ feedbackLayout: "terse" }}
                />
                <SchemaField.String
                    name="input8"
                    title="松散模式(feedbackLayout=loose)"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-decorator-props={{
                        feedbackLayout: "loose",
                        feedbackStatus: "error",
                        feedbackText:
                            "紧凑模式和松散模式他们的高度都是 `54px`，区别在于松散模式下会表单最外层的 `layout` 有一个：`margin-bottom: 2px`",
                    }}
                />
                <SchemaField.Void x-component="Title" x-component-props={{ text: "一条拉开距离的分割线" }} />
                <SchemaField.String
                    name="input9"
                    title="弹出模式(feedbackLayout=popover)"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-decorator-props={{
                        feedbackLayout: "popover",
                        feedbackStatus: "warning",
                        feedbackText: "弹出模式无法换行也不能手动修改方向，请注意提示长度",
                    }}
                />
                <SchemaField.String
                    name="input10"
                    title="弹出模式(feedbackLayout=popover)"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-decorator-props={{
                        feedbackLayout: "popover",
                        feedbackStatus: "error",
                        feedbackText: "若默认展开弹出提示时 `Dom` 结构上下文发生改变，提示本身不会自适应",
                    }}
                />
                <SchemaField.String
                    name="input11"
                    title="弹出模式(feedbackLayout=popover)"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-decorator-props={{
                        feedbackLayout: "popover",
                        feedbackStatus: "success",
                        feedbackText: "可在官方文档展开演示代码，改变页面高度时看到这个问题",
                    }}
                />
                <SchemaField.Void x-component="Title" x-component-props={{ text: "组件的适配情况" }} />
                <SchemaField.Void x-component="FormLayout" x-component-props={{ layout: "vertical" }}>
                    {verticalForm.map((key, i) => (
                        <SchemaField.String
                            x-decorator="FormItem"
                            key={key}
                            name={`input${12 + i}`}
                            title={key}
                            x-component={key}
                            x-decorator-props={feedBackSuccess}
                        />
                    ))}
                </SchemaField.Void>
            </SchemaField>
        </Panel>
    );
};

export default MarkupSchema;
