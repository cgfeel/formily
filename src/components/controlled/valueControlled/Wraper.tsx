import { Input } from "@formily/antd-v5";
import { Card, CardProps, Divider } from "antd";
import { FC, PropsWithChildren, ReactNode, useRef } from "react";
import FormItem from "../../formItem/form-item";

const Wraper: FC<PropsWithChildren<WraperProps>> = ({
  children,
  footer,
  values,
  update,
  name = "根组件",
  ...props
}) => {
  const count = useRef(1);
  return (
    <Card {...props}>
      <FormItem>
        <Input
          placeholder="控制者"
          value={values.input}
          onChange={event => update && update(event.target.value)}
        />
      </FormItem>
      {children}
      {name}渲染次数：{count.current++}
      {footer && (
        <>
          <Divider /> {footer}
        </>
      )}
    </Card>
  );
};

export interface WraperProps extends CardProps {
  values: FormType;
  footer?: ReactNode;
  name?: string;
  update?: (value: string) => void;
}

export default Wraper;
