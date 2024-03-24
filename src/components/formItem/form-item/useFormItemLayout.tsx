import { QuestionCircleOutlined } from "@ant-design/icons";
import { useFormLayout } from "../../formLayout/form-layout";
import { IFormItemProps } from "./types";

export const useFormItemLayout = (props: IFormItemProps) => {
    const layout = useFormLayout();
    const layoutType = props.layout ?? layout.layout ?? "horizontal";
    return {
        ...props,
        asterisk: props.asterisk,
        bordered: props.bordered ?? layout.bordered,
        colon: props.colon ?? layout.colon,
        feedbackIcon: props.feedbackIcon,
        feedbackLayout: props.feedbackLayout ?? layout.feedbackLayout ?? "loose",
        fullness: props.fullness ?? layout.fullness,
        inset: props.inset ?? layout.inset,
        layout: layoutType,
        labelAlign:
            layoutType === "vertical" ? props.labelAlign ?? "left" : props.labelAlign ?? layout.labelAlign ?? "right",
        labelCol: props.labelCol ?? layout.labelCol,
        labelWidth: props.labelWidth ?? layout.labelWidth,
        labelWrap: props.labelWrap ?? layout.labelWrap,
        optionalMarkHidden: props.optionalMarkHidden,
        requiredMark: layout.requiredMark,
        size: props.size ?? layout.size,
        tooltipIcon: props.tooltipIcon ?? layout.tooltipIcon ?? <QuestionCircleOutlined />,
        tooltipLayout: props.tooltipLayout ?? layout.tooltipLayout ?? "icon",
        wrapperAlign: props.wrapperAlign ?? layout.wrapperAlign,
        wrapperCol: props.wrapperCol ?? layout.wrapperCol,
        wrapperWidth: props.wrapperWidth ?? layout.wrapperWidth,
        wrapperWrap: props.wrapperWrap ?? layout.wrapperWrap,
    };
};
