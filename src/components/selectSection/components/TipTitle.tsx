import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import { observer, useField } from "@formily/react";
import { Typography } from "antd";
import { FC, PropsWithChildren } from "react";
import useStyle from "../styles/tipTitle";
import classNames from "classnames";

const { Text } = Typography;

const TipTitle: FC<PropsWithChildren<TipTitleProps>> = ({ children, className }) => {
  const field = useField();
  const prefixCls = usePrefixCls("tip-title");
  const [wrapSSR, hashId] = useStyle(prefixCls);

  return wrapSSR(
    <div className={classNames([hashId, prefixCls, className])}>
      {field.title && (
        <div className="secondary-title">
          <Text type="secondary">{field.title}</Text>
        </div>
      )}
      {children}
    </div>,
  );
};

export default observer(TipTitle);

interface TipTitleProps {
  className?: string;
}
