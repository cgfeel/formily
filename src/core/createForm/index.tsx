import { IFormProps, createForm } from "@formily/core";
import { FC, ReactNode, forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";
import Tool, { ToolProps } from "./Tool";

const CreateFormInner = forwardRef<CreateFormInnerInterface, CreateFormInnerProps>(
  ({ tool }, ref) => {
    const [formProps, setFormProps] = useState<IFormProps>({});
    const form = useMemo(() => createForm(formProps), [formProps]);

    useImperativeHandle(ref, () => ({
      update: values => setFormProps(values),
    }));

    return (
      <Panel
        footer={
          <p>
            创建一个 <code>Form</code> 实例，作为 <code>ViewModel</code> 给 UI 框架层消费
          </p>
        }
        header={<h2>createForm</h2>}
        extra={tool}
        form={form}
      >
        <SchemaField>
          <SchemaField.String
            name="aa"
            title="输入框"
            x-component="Input"
            x-decorator="FormItem"
            x-validator="number"
            x-component-props={{ allowClear: true }}
            required
          />
          <SchemaField.String
            name="bb"
            title="输入框"
            x-component="Input"
            x-decorator="FormItem"
            x-validator="number"
            x-component-props={{ allowClear: true }}
            required
          />
          <SchemaField.String
            name="cc"
            title={formProps.effects ? "受控框" : "输入框"}
            x-component="Input"
            x-decorator="FormItem"
            x-component-props={{ allowClear: true }}
            required
          />
        </SchemaField>
      </Panel>
    );
  },
);

const CreateForm: FC = () => {
  const ref = useRef<CreateFormInnerInterface>(null);
  return (
    <CreateFormInner ref={ref} tool={<Tool update={values => ref.current?.update(values)} />} />
  );
};

interface CreateFormInnerInterface extends ToolProps {}

interface CreateFormInnerProps {
  tool: ReactNode;
}

export default CreateForm;
