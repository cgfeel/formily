import { FormProvider, IProviderProps } from "@formily/react";
import { Card } from "antd";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../commonStylish";
import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import useStyle from "./styles/panel";
import classNames from "classnames";

const Panel: FC<PropsWithChildren<PanelProps>> = ({ children, footer, form, header }) => {
  const stylish = useStylish();
  const prefixCls = usePrefixCls("panel");
  const [wrapSSR, hashId] = useStyle(prefixCls);

  return wrapSSR(
    <div className={stylish.wraper}>
      {header}
      <div className={stylish.pannel}>
        <Card className={classNames(hashId, prefixCls)}>
          <FormProvider form={form}>{children}</FormProvider>
        </Card>
      </div>
      {footer}
    </div>,
  );
};

export interface PanelProps extends IProviderProps {
  footer?: ReactNode;
  header?: ReactNode;
}

export default Panel;
