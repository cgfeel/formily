import { IProviderProps } from "@formily/react";
import cls from "classnames";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../../components/commonStylish";
import Form from "../../components/form/form";

const Wraper: FC<PropsWithChildren<WraperProps>> = ({
  children,
  className,
  footer,
  form,
  header,
}) => {
  const stylish = useStylish();
  return (
    <div className={cls(stylish.wraper, className)}>
      {header}
      <div className={stylish.pannel}>
        <Form form={form}>{children}</Form>
      </div>
      {footer}
    </div>
  );
};

export interface WraperProps extends IProviderProps {
  className?: string;
  footer?: ReactNode;
  header?: ReactNode;
}

export default Wraper;
