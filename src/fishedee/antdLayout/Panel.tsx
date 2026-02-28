import { Form, FormButtonGroup, FormLayout, Reset, Submit } from "@formily/antd-v5";
import { Form as FormType } from "@formily/core";
import { FormConsumer } from "@formily/react";
import { FC, PropsWithChildren } from "react";
import Wrapper, { WrapperProps } from "../fieldAction/Wrapper";

const Panel: FC<PropsWithChildren<PanelProps>> = ({ children, ...props }) => (
  <Wrapper {...props}>
    <Form form={props.form} feedbackLayout="none">
      <FormLayout>
        {children}
        <FormButtonGroup.Sticky align="center">
          <FormButtonGroup gutter={10}>
            <Submit onSubmit={console.log} onSubmitFailed={console.log}>
              Submit
            </Submit>
            <Reset>重置</Reset>
          </FormButtonGroup>
        </FormButtonGroup.Sticky>
      </FormLayout>
      <code className="consumer">
        <pre>
          <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
        </pre>
      </code>
    </Form>
  </Wrapper>
);

export interface PanelProps extends WrapperProps {
  form: FormType;
}

export default Panel;
