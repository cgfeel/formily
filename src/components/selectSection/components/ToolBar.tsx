import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import { observer } from "@formily/react";
import { Flex } from "antd";
import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import useStyle from "../styles/toolbar";

const ToolBar: FC<PropsWithChildren<ToolBarProps>> = ({ children, className }) => {
  const prefixCls = usePrefixCls("toolbar");
  const [wrapSSR, hashId] = useStyle(prefixCls);

  return wrapSSR(
    <div className={classNames([hashId, prefixCls, className])}>
      <Flex justify="space-between">{children}</Flex>
    </div>,
  );
};

export default observer(ToolBar);

interface ToolBarProps {
  className?: string;
}
