import {
    Form,
    FormDisplayTypes,
    FormPatternTypes,
    IFormProps,
    createForm,
    isField,
    onFieldReact,
    onFormMount,
    onFormValuesChange,
} from "@formily/core";
import { FC, useCallback, useMemo } from "react";
import { PanelIner } from "./Panel";
import { ToolSchema } from "./SchemaField";

const defaultData = { aa: "123", bb: "321" };
const effectsMethod: IFormProps["effects"] = () => {
    onFieldReact("cc", field => {
        if (isField(field)) field.value = field.query("aa").value() || "";
    });
};

const Tool: FC<ToolProps> = ({ update }) => {
    const onFromChange = useCallback(
        (form: Form<ToolForm>) => {
            const { disabled, editable, effects, hidden, readOnly, readPretty, init = true, ...values } = form.values;
            const data: IFormProps = {
                ...values,
                ...(disabled === 0 ? {} : { disabled }),
                ...(editable === 0 ? {} : { editable }),
                ...(effects ? { effects: effectsMethod } : {}),
                ...(hidden === 0 ? {} : { hidden }),
                ...{ [init ? "initialValues" : "values"]: defaultData },
                ...(readOnly === 0 ? {} : { readOnly }),
                ...(readPretty === 0 ? {} : { readPretty }),
            };
            update(data);
        },
        [update],
    );

    const form = useMemo(
        () =>
            createForm<ToolForm>({
                effects: () => {
                    onFormMount(form => onFromChange(form));
                    onFormValuesChange(form => onFromChange(form));
                },
            }),
        [onFromChange],
    );
    return (
        <PanelIner form={form} formProps={{ layout: "vertical" }}>
            <ToolSchema>
                <ToolSchema.Void x-component="FormGrid" x-component-props={{ maxColumns: 4 }}>
                    <ToolSchema.Boolean
                        default={true}
                        name="init"
                        title="初始值"
                        x-component="Select"
                        x-decorator="FormItem"
                        enum={[
                            { label: "initialValues", value: true },
                            { label: "values", value: false },
                        ]}
                        x-decorator-props={{
                            tooltip: "设置初始值后，随意修改表单内容后点“重置”按钮，查看不同",
                        }}
                    />
                    <ToolSchema.String
                        default="editable"
                        name="pattern"
                        title="交互模式"
                        x-component="Select"
                        x-decorator="FormItem"
                        enum={[
                            { label: "disabled", value: "disabled" },
                            { label: "editable", value: "editable" },
                            { label: "readOnly", value: "readOnly" },
                            { label: "readPretty", value: "readPretty" },
                        ]}
                    />
                    <ToolSchema.String
                        default="visible"
                        name="display"
                        title="表单显隐"
                        x-component="Select"
                        x-decorator="FormItem"
                        enum={[
                            { label: "hidden", value: "hidden" },
                            { label: "none", value: "none" },
                            { label: "visible", value: "visible" },
                        ]}
                        x-decorator-props={{
                            tooltip: "设置 none 的话是没有值的，但是由于这里默认设置了初始值，所以能够打印表单的初始值",
                        }}
                    />
                    <ToolSchema.Boolean
                        default={0}
                        name="hidden"
                        title="UI 显隐"
                        x-component="Select"
                        x-decorator="FormItem"
                        enum={[
                            { label: "随display", value: 0 },
                            { label: "true", value: true },
                            { label: "false", value: false },
                        ]}
                        x-decorator-props={{
                            tooltip: "hidden 优先级要大于 display，所以这里默认以 display 方式展示",
                        }}
                    />
                    <ToolSchema.Boolean
                        default={0}
                        name="editable"
                        title="可编辑"
                        x-component="Select"
                        x-decorator="FormItem"
                        enum={[
                            { label: "随pattern", value: 0 },
                            { label: "true", value: true },
                            { label: "false", value: false },
                        ]}
                        x-decorator-props={{
                            tooltip: "editable 优先级要大于 pattern，所以这里默认以 pattern 方式展示",
                        }}
                    />
                    <ToolSchema.Boolean
                        default={0}
                        name="disabled"
                        title="禁用"
                        x-component="Select"
                        x-decorator="FormItem"
                        enum={[
                            { label: "随pattern", value: 0 },
                            { label: "true", value: true },
                            { label: "false", value: false },
                        ]}
                        x-decorator-props={{
                            tooltip: "disabled 优先级要大于 pattern，所以这里默认以 pattern 方式展示",
                        }}
                    />
                    <ToolSchema.Boolean
                        default={0}
                        name="readOnly"
                        title="只读"
                        x-component="Select"
                        x-decorator="FormItem"
                        enum={[
                            { label: "随pattern", value: 0 },
                            { label: "true", value: true },
                            { label: "false", value: false },
                        ]}
                        x-decorator-props={{
                            tooltip: "readOnly 优先级要大于 pattern，所以这里默认以 pattern 方式展示",
                        }}
                    />
                    <ToolSchema.Boolean
                        default={0}
                        name="readPretty"
                        title="优雅阅读"
                        x-component="Select"
                        x-decorator="FormItem"
                        enum={[
                            { label: "随pattern", value: 0 },
                            { label: "true", value: true },
                            { label: "false", value: false },
                        ]}
                        x-decorator-props={{
                            tooltip: "readPretty 优先级要大于 pattern，所以这里默认以 pattern 方式展示",
                        }}
                    />
                    <ToolSchema.Boolean
                        default={true}
                        name="effects"
                        title="联动"
                        x-component="Switch"
                        x-decorator="FormItem"
                    />
                    <ToolSchema.Boolean
                        default={false}
                        name="validateFirst"
                        title="校验规则"
                        x-component="Switch"
                        x-decorator="FormItem"
                        x-decorator-props={{
                            tooltip: "是否只校验第一个非法规则，默认是 false，目前还未看出区别",
                        }}
                    />
                </ToolSchema.Void>
            </ToolSchema>
        </PanelIner>
    );
};

type ToolForm = {
    disabled: boolean | 0;
    display: FormDisplayTypes;
    editable: boolean | 0;
    effects: boolean;
    hidden: boolean | 0;
    init: boolean;
    pattern: FormPatternTypes;
    readOnly: boolean | 0;
    readPretty: boolean | 0;
    validateFirst: boolean;
};

export interface ToolProps {
    update: (values: IFormProps) => void;
}

export default Tool;
