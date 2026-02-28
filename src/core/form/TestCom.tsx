import { ArrayField, createForm } from "@formily/core";
import { FormProvider, createSchemaField, useField } from "@formily/react";
import { FC, InputHTMLAttributes, PropsWithChildren } from "react";

const form = createForm();

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ value = "", ...props }) => (
  <input {...props} data-testid="input" value={value} />
);

const VoidComponent: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid="void-component">{children}</div>
);

const ArrayComponent: FC = () => {
  const { value } = useField<ArrayField>();
  return (
    <>
      {value.map((_, index) => (
        <Input key={index} value="" onChange={val => console.log(val)} />
      ))}
    </>
  );
};

const SchemaField = createSchemaField({
  components: {
    ArrayComponent,
    Input,
    VoidComponent,
  },
});

const Markup: FC<PropsWithChildren> = ({ children }) => (
  <FormProvider form={form}>
    <SchemaField>{children}</SchemaField>
  </FormProvider>
);

const TestCom: FC = () => (
  <Markup>
    <SchemaField.Array name="array" default={[{ input: "" }]} x-component="ArrayComponent" />
    <SchemaField.Number x-component="Input" />
  </Markup>
);

export default TestCom;
