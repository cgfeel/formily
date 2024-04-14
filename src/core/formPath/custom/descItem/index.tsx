import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import { connect, mapProps } from "@formily/react";
import cls from "classnames";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStyle from "./style";

const DescItemInter: FC<PropsWithChildren<DescItemProps>> = ({
    children,
    className,
    extra,
    feedbackError,
    feedbackText,
    prefixCls: prefixClsRaw,
    title,
}) => {
    const prefixCls = usePrefixCls("desc-item", { prefixCls: prefixClsRaw });
    const [wrapSSR, hashId] = useStyle(prefixCls);
    return wrapSSR(
        <div
            className={cls(
                className,
                {
                    [`${prefixCls}`]: true,
                },
                hashId,
            )}>
            {title && <h2>{title}</h2>}
            {feedbackText && <div>{feedbackText}</div>}
            {children && (
                <div>
                    <p>
                        <strong>演示：</strong>
                    </p>
                    {children}
                </div>
            )}
            {extra && (
                <div className={cls(`${prefixCls}-extra`, { [`${prefixCls}-error`]: feedbackError })}>
                    <p>
                        <strong>用例：</strong>
                    </p>
                    <code>
                        <pre>{extra}</pre>
                    </code>
                </div>
            )}
        </div>,
    );
};

const DescItem = Object.assign(
    connect(
        DescItemInter,
        mapProps((props, field) => ({
            ...props,
            title: props.title || field.title,
        })),
    ),
    { DescItemInter },
);

interface DescItemProps {
    className?: string;
    extra?: ReactNode;
    feedbackError?: boolean;
    feedbackText?: ReactNode;
    prefixCls?: string;
    title?: ReactNode;
}

export default DescItem;
