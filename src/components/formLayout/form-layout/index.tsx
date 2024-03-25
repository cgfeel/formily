import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import { useResponsiveFormLayout } from "@formily/antd-v5/lib/form-layout/useResponsiveFormLayout";
import { CSSProperties, FC, PropsWithChildren, ReactNode, createContext, useContext } from "react";
import cls from "classnames";
import useStyle from "./style";

export interface IFormLayoutContext
    extends Omit<IFormLayoutProps, "labelAlign" | "wrapperAlign" | "layout" | "labelCol" | "wrapperCol"> {
    labelAlign?: "right" | "left";
    wrapperAlign?: "right" | "left";
    layout?: "vertical" | "horizontal" | "inline";
    labelCol?: number;
    wrapperCol?: number;
}

export const FormLayoutDeepContext = createContext<IFormLayoutContext>({});

export const FormLayoutShallowContext = createContext<IFormLayoutContext>({});

export const useFormDeepLayout = () => useContext(FormLayoutDeepContext);

export const useFormShallowLayout = () => useContext(FormLayoutShallowContext);

export const useFormLayout = () => ({
    ...useFormDeepLayout(),
    ...useFormShallowLayout(),
});

export const FormLayout: FC<PropsWithChildren<IFormLayoutProps>> & {
    useFormLayout: () => IFormLayoutContext;
    useFormDeepLayout: () => IFormLayoutContext;
    useFormShallowLayout: () => IFormLayoutContext;
} = ({ shallow, children, prefixCls, className, style, ...otherProps }) => {
    const { ref, props } = useResponsiveFormLayout(otherProps);
    const deepLayout = useFormDeepLayout();
    const formPrefixCls = usePrefixCls("form", { prefixCls });
    const layoutPrefixCls = usePrefixCls("formily-layout", { prefixCls });
    const [wrapSSR, hashId] = useStyle(layoutPrefixCls);
    const layoutClassName = cls(
        layoutPrefixCls,
        {
            [`${formPrefixCls}-${props.layout}`]: true,
            [`${formPrefixCls}-rtl`]: props.direction === "rtl",
            [`${formPrefixCls}-${props.size}`]: props.size,
        },
        className,
    );
    const renderChildren = () => {
        const newDeepLayout = {
            ...deepLayout,
        };
        if (!shallow) {
            Object.assign(newDeepLayout, props);
        } else {
            if (props.size) {
                newDeepLayout.size = props.size;
            }
            if (props.colon) {
                newDeepLayout.colon = props.colon;
            }
        }
        return (
            <FormLayoutDeepContext.Provider value={newDeepLayout}>
                <FormLayoutShallowContext.Provider value={shallow ? props : undefined}>
                    {children}
                </FormLayoutShallowContext.Provider>
            </FormLayoutDeepContext.Provider>
        );
    };
    return wrapSSR(
        <div ref={ref} className={cls(layoutClassName, hashId)} style={style}>
            {renderChildren()}
        </div>,
    );
};

FormLayout.defaultProps = {
    shallow: true,
};

FormLayout.useFormDeepLayout = useFormDeepLayout;
FormLayout.useFormShallowLayout = useFormShallowLayout;
FormLayout.useFormLayout = useFormLayout;

export interface IFormLayoutProps {
    bordered?: boolean;
    breakpoints?: number[];
    className?: string;
    colon?: boolean;
    direction?: "rtl" | "ltr";
    feedbackLayout?: "loose" | "terse" | "popover" | "none";
    fullness?: boolean;
    gridColumnGap?: number;
    gridRowGap?: number;
    inset?: boolean;
    labelAlign?: "right" | "left" | ("right" | "left")[];
    labelCol?: number | number[];
    labelWidth?: number;
    labelWrap?: boolean;
    layout?: "vertical" | "horizontal" | "inline" | ("vertical" | "horizontal" | "inline")[];
    prefixCls?: string;
    requiredMark?: boolean | "optional";
    shallow?: boolean;
    size?: "small" | "default" | "large";
    spaceGap?: number;
    style?: CSSProperties;
    tooltipIcon?: ReactNode;
    tooltipLayout?: "icon" | "text";
    wrapperAlign?: "right" | "left" | ("right" | "left")[];
    wrapperCol?: number | number[];
    wrapperWidth?: number;
    wrapperWrap?: boolean;
}

export default FormLayout;
