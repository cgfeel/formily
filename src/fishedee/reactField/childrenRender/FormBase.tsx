import { FormLayout } from "@formily/antd-v5";
import { FormConsumer } from "@formily/react";
import { FC, PropsWithChildren } from "react";
import Wrapper, { WrapperProps } from "../../fieldAction/Wrapper";

const FormBase: FC<PropsWithChildren<WrapperProps>> = ({ children, ...props }) => (
  <Wrapper {...props}>
    <FormLayout labelCol={6} wrapperCol={10}>
      {children}
    </FormLayout>
    <code className="consumer">
      <pre>
        <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
      </pre>
    </code>
  </Wrapper>
);

export default FormBase;
