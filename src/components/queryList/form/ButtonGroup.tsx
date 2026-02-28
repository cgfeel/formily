import { FormButtonGroup } from "@formily/antd-v5";
import { Button } from "antd";
import { FC, PropsWithChildren } from "react";

const ButtonGroup: FC<PropsWithChildren<ButtonGroupProps>> = ({
  children,
  className,
  expanded,
  type,
  toggle,
}) => {
  if (type === "incomplete-wrap") {
    return (
      <FormButtonGroup.FormItem>
        <FormButtonGroup>{children}</FormButtonGroup>
      </FormButtonGroup.FormItem>
    );
  }

  if (type === "collapsible") {
    return (
      <>
        <FormButtonGroup>
          <Button type="link" onClick={toggle}>
            {expanded ? "折叠" : "展开"}
          </Button>
        </FormButtonGroup>
        <FormButtonGroup align="right">{children}</FormButtonGroup>
      </>
    );
  }

  return (
    <FormButtonGroup align="right" className={className}>
      {children}
    </FormButtonGroup>
  );
};

export interface ButtonGroupProps {
  expanded: boolean;
  type: "collapsible" | "complete-wrap" | "incomplete-wrap";
  toggle: () => void;
  className?: string;
}

export default ButtonGroup;
