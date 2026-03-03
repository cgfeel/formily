import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import { Card } from "antd";
import classNames from "classnames";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../commonStylish";
import useStyle from "./styles/panel";

const Wraper: FC<PropsWithChildren<PanelProps>> = ({ children, footer, header }) => {
  const stylish = useStylish();
  const prefixCls = usePrefixCls("panel");
  const [wrapSSR, hashId] = useStyle(prefixCls);

  return wrapSSR(
    <div className={stylish.wraper}>
      {header}
      <div className={stylish.pannel}>
        <Card className={classNames(hashId, prefixCls)}>{children}</Card>
      </div>
      {footer}
    </div>,
  );
};

export interface PanelProps {
  footer?: ReactNode;
  header?: ReactNode;
}

export default Wraper;
