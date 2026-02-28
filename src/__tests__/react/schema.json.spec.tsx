import { createForm } from "@formily/core";
import { FormProvider, Schema, createSchemaField } from "@formily/react";
import { render, screen } from "@testing-library/react";
import { FC, PropsWithChildren } from "react";
import { Input, MarkupProps, ObjectComponent, TextComponent } from "./SchemaComs";

describe("json schema field", () => {
  const SchemaField = createSchemaField({
    components: {
      Input,
      ObjectComponent,
      TextComponent,
    },
  });
  const Markup: FC<PropsWithChildren<MarkupProps>> = ({ children, form, ...props }) => (
    <FormProvider form={form}>
      <SchemaField {...props}>{children}</SchemaField>
    </FormProvider>
  );

  // 字符字段，注意：这里模型是一个字段，而不是整个 ISchema 字段，所以必须给 SchemaField 一个 name 才能正常渲染
  test("string field", () => {
    const form = createForm();
    const schema = new Schema({
      default: "123",
      type: "string",
      "x-component": "Input",
    });

    render(<Markup name="string" form={form} schema={schema} />);
    expect(screen.queryByTestId("input")).toBeVisible();
    expect(screen.queryByTestId("input")?.getAttribute("value")).toEqual("123");
  });

  // 对象字段 - 文档中是通过 ISchema 这个对象构建表单，并没有包含对象字段，我在这里加上去了
  // 由于这里用的是 ISchema 对象，所以不需要像文档那样赋予字段 name 属性
  test("object field", () => {
    const form = createForm();
    render(
      <Markup
        form={form}
        schema={{
          type: "object",
          properties: {
            string: {
              type: "string",
              "x-component": "Input",
            },
            object: {
              type: "object",
              "x-component": "ObjectComponent",
              default: { input: "" },
            },
          },
        }}
      />,
    );
    expect(screen.queryAllByTestId("input").length).toBe(2);
  });

  // 补充一个单独创建 object 字段的例子
  test("object single field", () => {
    const form = createForm();
    const schema = new Schema({
      type: "object",
      "x-component": "ObjectComponent",
      default: { input: "" },
    });

    render(<Markup name="object" form={form} schema={schema} />);
    expect(screen.queryByTestId("input")).toBeVisible();
  });

  // 通过 x-component-props 传递 children
  test("x-component-props children", () => {
    const form = createForm();
    render(
      <Markup
        form={form}
        schema={{
          type: "object",
          properties: {
            string: {
              type: "string",
              "x-component": "TextComponent",
              "x-component-props": {
                children: "children",
                name: "children-test",
              },
            },
          },
        }}
      />,
    );
    expect(screen.queryByTestId("children-test")).toBeVisible();
    expect(screen.queryByTestId("children-test")?.innerHTML).toEqual("children");
  });

  // 通过 x-content 传递 children
  test("x-content", async () => {
    const form = createForm();
    render(
      <Markup
        form={form}
        schema={{
          type: "object",
          properties: {
            string: {
              type: "string",
              "x-component": "TextComponent",
              "x-content": "content",
              "x-component-props": {
                name: "content-test",
              },
            },
          },
        }}
      />,
    );
    expect(screen.queryByTestId("content-test")).toBeVisible();
    expect(screen.queryByTestId("content-test")?.innerHTML).toEqual("content");
  });
});
