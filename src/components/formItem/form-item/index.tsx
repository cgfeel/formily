import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { pickDataProps, usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import { useOverflow } from "@formily/antd-v5/lib/form-item/hooks";
import { isVoidField } from "@formily/core";
import { connect, mapProps, ReactFC } from "@formily/react";
import { ConfigProvider, Popover, Tooltip } from "antd";
import cls from "classnames";
import { CSSProperties, FC, PropsWithChildren, useContext, useState } from "react";
import { FormLayoutShallowContext } from "../../formLayout/form-layout";
import useStyle from "./style";
import { IFormItemProps } from "./types";
import { useFormItemLayout } from "./useFormItemLayout";

const ICON_MAP = {
    error: <CloseCircleOutlined />,
    success: <CheckCircleOutlined />,
    warning: <ExclamationCircleOutlined />,
} as const;

const IconMap: FC<{ feedbackStatus: ReturnType<typeof useFormItemLayout>["feedbackStatus"] }> = ({
    feedbackStatus,
}) => {
    switch (feedbackStatus) {
        case "error":
            return ICON_MAP.error;
        case "success":
            return ICON_MAP.success;
        case "warning":
            return ICON_MAP.warning;
        default:
            return null;
    }
};

export const BaseItem: FC<PropsWithChildren<IFormItemProps>> = ({ children, ...props }) => {
    const [active, setActive] = useState(false);
    const formLayout = useFormItemLayout(props);
    const { locale } = useContext(ConfigProvider.ConfigContext);
    const { containerRef, contentRef, overflow } = useOverflow<HTMLDivElement, HTMLSpanElement>();
    const {
        addonAfter,
        addonBefore,
        asterisk,
        extra,
        feedbackIcon,
        fullness,
        feedbackLayout,
        feedbackStatus,
        feedbackText,
        inset,
        label,
        labelAlign,
        labelCol,
        labelWidth,
        labelWrap,
        layout,
        size,
        style,
        tooltip,
        tooltipIcon,
        tooltipLayout,
        wrapperCol,
        wrapperWidth,
        wrapperWrap,
        getPopupContainer,
        bordered = true,
        colon = true,
        optionalMarkHidden = false,
        requiredMark = true,
        wrapperAlign = "left",
    } = formLayout;
    const labelStyle = { ...formLayout.labelStyle };
    const wrapperStyle = { ...formLayout.wrapperStyle };
    const prefixCls = usePrefixCls("formily-item", props);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    // 固定宽度
    let enableCol = false;
    if (labelWidth || wrapperWidth) {
        if (labelWidth) {
            labelStyle.width = labelWidth === "auto" ? void 0 : labelWidth;
            labelStyle.maxWidth = labelWidth === "auto" ? void 0 : labelWidth;
        }
        if (wrapperWidth) {
            wrapperStyle.width = wrapperWidth === "auto" ? void 0 : wrapperWidth;
            wrapperStyle.maxWidth = wrapperWidth === "auto" ? void 0 : wrapperWidth;
        }
        // 栅格模式
    }
    if (labelCol || wrapperCol) {
        if (!labelStyle.width && !wrapperStyle.width && layout !== "vertical") {
            enableCol = true;
        }
    }

    const formatChildren =
        feedbackLayout === "popover" ? (
            <Popover
                autoAdjustOverflow
                overlayClassName={`${prefixCls}-popover`}
                placement="top"
                content={
                    <div
                        className={cls({
                            [`${prefixCls}-${feedbackStatus}-help`]: !!feedbackStatus,
                            [`${prefixCls}-help`]: true,
                        })}>
                        <IconMap feedbackStatus={feedbackStatus} /> {feedbackText}
                    </div>
                }
                open={!!feedbackText}
                getPopupContainer={getPopupContainer}>
                <>{children}</>
            </Popover>
        ) : (
            children
        );

    const gridStyles: CSSProperties = {};

    const getOverflowTooltip = () => {
        if (overflow) {
            return (
                <div>
                    <div>{label}</div>
                    <div>{tooltip}</div>
                </div>
            );
        }
        return tooltip;
    };

    const renderLabelText = () => {
        const labelChildren = (
            <div className={`${prefixCls}-label-content`} ref={containerRef}>
                <span ref={contentRef}>
                    {asterisk && requiredMark === true && <span className={`${prefixCls}-asterisk`}>{"*"}</span>}
                    <label>{label}</label>
                    {!asterisk && requiredMark === "optional" && !optionalMarkHidden && (
                        <span className={`${prefixCls}-optional`}>{locale?.Form?.optional}</span>
                    )}
                </span>
            </div>
        );

        if ((tooltipLayout === "text" && tooltip) || overflow) {
            return (
                <Tooltip placement="top" title={getOverflowTooltip()}>
                    {labelChildren}
                </Tooltip>
            );
        }
        return labelChildren;
    };

    const renderTooltipIcon = () => {
        if (tooltip && tooltipLayout === "icon" && !overflow) {
            return (
                <span className={`${prefixCls}-label-tooltip-icon`}>
                    <Tooltip placement="top" title={tooltip}>
                        {tooltipIcon}
                    </Tooltip>
                </span>
            );
        }
    };

    const renderLabel = () => {
        if (!label) return null;
        return (
            <div
                className={cls({
                    [`${prefixCls}-label`]: true,
                    [`${prefixCls}-label-tooltip`]: (tooltip && tooltipLayout === "text") || overflow,
                    [`${prefixCls}-item-col-${labelCol}`]: enableCol && !!labelCol,
                })}
                style={labelStyle}>
                {renderLabelText()}
                {renderTooltipIcon()}
                {label !== " " && <span className={`${prefixCls}-colon`}>{colon ? ":" : ""}</span>}
            </div>
        );
    };

    return wrapSSR(
        <div
            {...pickDataProps(props)}
            style={{
                ...style,
                ...gridStyles,
            }}
            data-grid-span={props.gridSpan}
            className={cls(
                props.className,
                {
                    [`${prefixCls}`]: true,
                    [`${prefixCls}-layout-${layout}`]: true,
                    [`${prefixCls}-${feedbackStatus}`]: !!feedbackStatus,
                    [`${prefixCls}-feedback-has-text`]: !!feedbackText,
                    [`${prefixCls}-size-${size}`]: !!size,
                    [`${prefixCls}-feedback-layout-${feedbackLayout}`]: !!feedbackLayout,
                    [`${prefixCls}-fullness`]: !!fullness || !!inset || !!feedbackIcon,
                    [`${prefixCls}-inset`]: !!inset,
                    [`${prefixCls}-active`]: active,
                    [`${prefixCls}-inset-active`]: !!inset && active,
                    [`${prefixCls}-label-align-${labelAlign}`]: true,
                    [`${prefixCls}-control-align-${wrapperAlign}`]: true,
                    [`${prefixCls}-label-wrap`]: !!labelWrap,
                    [`${prefixCls}-control-wrap`]: !!wrapperWrap,
                    [`${prefixCls}-bordered-none`]: bordered === false || !!inset || !!feedbackIcon,
                },
                hashId,
            )}
            onFocus={() => {
                if (feedbackIcon || inset) {
                    setActive(true);
                }
            }}
            onBlur={() => {
                if (feedbackIcon || inset) {
                    setActive(false);
                }
            }}>
            {renderLabel()}
            <div
                className={cls({
                    [`${prefixCls}-control`]: true,
                    [`${prefixCls}-item-col-${wrapperCol}`]: enableCol && !!wrapperCol && label,
                })}>
                <div className={cls(`${prefixCls}-control-content`)}>
                    {addonBefore && <div className={cls(`${prefixCls}-addon-before`)}>{addonBefore}</div>}
                    <div
                        style={wrapperStyle}
                        className={cls({
                            [`${prefixCls}-control-content-component`]: true,
                            [`${prefixCls}-control-content-component-has-feedback-icon`]: !!feedbackIcon,
                        })}>
                        <FormLayoutShallowContext.Provider value={{}}>
                            {formatChildren}
                        </FormLayoutShallowContext.Provider>
                        {feedbackIcon && <div className={cls(`${prefixCls}-feedback-icon`)}>{feedbackIcon}</div>}
                    </div>
                    {addonAfter && <div className={cls(`${prefixCls}-addon-after`)}>{addonAfter}</div>}
                </div>
                {!!feedbackText && feedbackLayout !== "popover" && feedbackLayout !== "none" && (
                    <div
                        className={cls({
                            [`${prefixCls}-${feedbackStatus}-help`]: !!feedbackStatus,
                            [`${prefixCls}-help`]: true,
                            [`${prefixCls}-help-enter`]: true,
                            [`${prefixCls}-help-enter-active`]: true,
                        })}>
                        {feedbackText}
                    </div>
                )}
                {extra && <div className={cls(`${prefixCls}-extra`)}>{extra}</div>}
            </div>
        </div>,
    );
};

// 适配
export const FormItem: ComposeFormItem = Object.assign(
    connect(
        BaseItem,
        mapProps((props, field) => {
            if (isVoidField(field))
                return {
                    label: field.title || props.label,
                    asterisk: props.asterisk,
                    extra: props.extra || field.description,
                };
            if (!field) return props;
            const takeFeedbackStatus = () => {
                if (field.validating) return "pending";
                return field.decoratorProps.feedbackStatus || field.validateStatus;
            };
            const takeMessage = () => {
                const split = (messages: any[]) => {
                    return messages.reduce((buf, text, index) => {
                        if (!text) return buf;
                        return index < messages.length - 1 ? buf.concat([text, ", "]) : buf.concat([text]);
                    }, []);
                };
                if (field.validating) return;
                if (props.feedbackText) return props.feedbackText;
                if (field.selfErrors.length) return split(field.selfErrors);
                if (field.selfWarnings.length) return split(field.selfWarnings);
                if (field.selfSuccesses.length) return split(field.selfSuccesses);
            };
            const takeAsterisk = () => {
                if ("asterisk" in props) {
                    return props.asterisk;
                }
                if (field.required && field.pattern !== "readPretty") {
                    return true;
                }
                return false;
            };
            return {
                asterisk: takeAsterisk(),
                extra: props.extra || field.description,
                feedbackStatus: takeFeedbackStatus(),
                feedbackText: takeMessage(),
                label: props.label || field.title,
                optionalMarkHidden: field.pattern === "readPretty" && !("asterisk" in props),
            };
        }),
    ),
    {
        BaseItem,
    },
);

type ComposeFormItem = ReactFC<IFormItemProps> & {
    BaseItem: ReactFC<IFormItemProps>;
};

export * from "@formily/antd-v5/lib/form-item/hooks";
export * from "./types";

export default FormItem;
