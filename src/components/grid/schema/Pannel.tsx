import { FormButtonGroup, ISubmitProps, Submit } from "@formily/antd-v5";
import { FormProvider, IProviderProps } from "@formily/react";
import { Card } from "antd";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../../commonStylish";

const field = ["a", "b", "c", "d", "e", "f", "g"];

const Pannel: FC<PropsWithChildren<PannelProps>> = ({ children, footer, form, header, submit }) => {
  const stylish = useStylish();
  return (
    <div className={stylish.wraper}>
      {header}
      <div className={stylish.pannel}>
        <Card>
          <FormProvider form={form}>
            {children}
            <FormButtonGroup>
              <Submit {...submit}>提交</Submit>
            </FormButtonGroup>
          </FormProvider>
        </Card>
      </div>
      {footer}
    </div>
  );
};

export interface PannelProps extends IProviderProps {
  footer?: ReactNode;
  header?: ReactNode;
  submit?: ISubmitProps;
}

export { field };

export default Pannel;
