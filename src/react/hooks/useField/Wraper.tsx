import { FormConsumer } from "@formily/react";
import { Button, Form } from "antd";
import { FC, PropsWithChildren } from "react";
import Panel, { PanelProps } from "../../Panel";
import CodePreview from "../../CodePreview";

const Wraper: FC<PropsWithChildren<WraperProps>> = ({ children, form, ...props }) => (
  <Panel {...props} form={form}>
    <Form layout="vertical">
      {children}
      <CodePreview>
        <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
      </CodePreview>
      <Button type="primary" onClick={() => form.submit(console.log).catch(console.log)}>
        Submit
      </Button>
    </Form>
  </Panel>
);

export interface WraperProps extends PanelProps {}

export default Wraper;
