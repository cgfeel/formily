import { createForm } from "@formily/core";
import { ExpressionScope, Field, FormProvider, createSchemaField, useField } from "@formily/react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { FC, PropsWithChildren, ReactNode } from "react";
import { MarkupProps, TextComponent } from "./SchemaComs";

const Container: FC<PropsWithChildren> = ({ children }) => (
  <ExpressionScope value={{ $innerScope: "thisis inner scope value" }}>{children}</ExpressionScope>
);

const InputExtra: FC<Partial<Record<"aa" | "extra", ReactNode>>> = ({ aa, extra }) => {
  const field = useField();
  return (
    <div data-testid="input">
      {aa}
      {field.title}
      {extra}
    </div>
  );
};

const SchemaField = createSchemaField({
  components: {
    Container,
    InputExtra,
    TextComponent,
  },
});

const Markup: FC<PropsWithChildren<MarkupProps>> = ({ children, form, ...props }) => (
  <FormProvider form={form}>
    <SchemaField {...props}>{children}</SchemaField>
  </FormProvider>
);

// 自定义组件内部给 json-schema 表达式传递局部作用域
test("expression scope", async () => {
  const form = createForm();
  render(
    <Markup form={form} scope={{ $outerScope: "this is outer scope value" }}>
      <SchemaField.Void x-component="Container">
        <SchemaField.String
          name="input"
          x-component="TextComponent"
          x-content="{{$innerScope + ' ' + $outerScope}}"
          x-component-props={{ name: "test-input" }}
        />
      </SchemaField.Void>
    </Markup>,
  );

  expect(screen.queryByTestId("test-input")?.textContent).toEqual(
    "thisis inner scope value this is outer scope value",
  );
});

// 忽略编译，单例举了两处作用域：title、x-component-props，其中忽略编译了 x-component-props
test("x-compile-omitted", async () => {
  const form = createForm();
  render(
    <Markup form={form}>
      <SchemaField.String
        name="target"
        title="{{123 + '321'}}"
        x-compile-omitted={["x-component-props"]}
        x-component="InputExtra"
        x-component-props={{
          aa: "{{fake}}",
          extra: "extra",
        }}
      />
    </Markup>,
  );

  await waitFor(() => {
    expect(screen.queryByTestId("input")?.textContent).toEqual("{{fake}}123321extra");
  });
});

// 表单隐藏和可见
test("field hidden & visible", async () => {
  const form = createForm({ initialValues: { empty: null } });
  render(
    <FormProvider form={form}>
      <div data-testid="testid">
        <Field name="empty" component={[InputExtra]} />
      </div>
    </FormProvider>,
  );

  await screen.findByTestId("testid");

  expect(form.fields.empty.hidden).toBeFalsy();
  expect(form.query("empty").value()).toBeNull();

  act(() => {
    form.fields.empty.hidden = true;
  });
  expect(form.fields.empty.hidden).toBeTruthy();
  expect(form.query("empty").value()).toBeNull();

  act(() => {
    form.fields.empty.hidden = false;
  });
  expect(form.fields.empty.hidden).toBeFalsy();
  expect(form.fields.empty.visible).toBeTruthy();
  expect(form.query("empty").value()).toBeNull();

  // 当 visible 为 false 的时候，就相当于 display: none
  act(() => {
    form.fields.empty.visible = false;
  });
  expect(form.fields.empty.visible).toBeFalsy();
  expect(form.query("empty").value()).toBeUndefined();

  act(() => {
    form.fields.empty.visible = true;
  });
  expect(form.fields.empty.visible).toBeTruthy();
  expect(form.query("empty").value()).toBeNull();
});
