import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import useCollapseStyle from "../styles/collapse";

const PanelDecorator: FC<PropsWithChildren> = ({ children }) => {
    const prefixCls = usePrefixCls("collapse");
    const [wrapSSR, hashId] = useCollapseStyle(prefixCls);
    return wrapSSR(
        <div className={classNames(`${prefixCls}-group`, hashId)} onClick={event => event.stopPropagation()}>
            {children}
        </div>,
    );
};

export default PanelDecorator;
