import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import useStyle from "../styles/scrollWapper";

const ScrollWapper: FC<PropsWithChildren<ScrollWapperProps>> = ({
  children,
  className,
  minHeight = 400,
}) => {
  const prefixCls = usePrefixCls("scrollwapper");
  const [wrapSSR, hashId] = useStyle(prefixCls);

  return wrapSSR(
    <div className={classNames([hashId, prefixCls, className])} data-min-height={minHeight}>
      {children}
    </div>,
  );
};

export default ScrollWapper;

interface ScrollWapperProps {
  className?: string;
  minHeight?: number;
}
