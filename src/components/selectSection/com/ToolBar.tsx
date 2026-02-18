import { ContainerOutlined, DatabaseOutlined } from "@ant-design/icons";
import { observer, useField } from "@formily/react";
import { Button, Flex } from "antd";
import { FC, PropsWithChildren } from "react";

const ToolBar: FC<PropsWithChildren<ToolBarProps>> = ({ children, onExpand, expand = true }) => {
  const field = useField();
  const disabled = !!field.componentProps.disabled;

  return (
    <Flex justify="space-between">
      <div>{children}</div>
      <Button disabled={disabled} size="small" type="link" onClick={() => onExpand && onExpand(expand)}>
        {disabled || expand ? (
          <>
            <ContainerOutlined /> 展开
          </>
        ) : (
          <>
            <DatabaseOutlined /> 收起
          </>
        )}
      </Button>
    </Flex>
  );
};

export default observer(ToolBar);

interface ToolBarProps {
  expand?: boolean;
  onExpand?: (show: boolean) => void;
}
