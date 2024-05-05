import { Form, createForm } from "@formily/core";
import { FormProvider, createSchemaField } from "@formily/react";
import { render } from "@testing-library/react";
import { FC, PropsWithChildren } from "react";
import { ArrayComponent, CustomObject, Input, ObjectComponent, TextComponent, VoidComponent } from "./SchemaComs";

// 标记模型字段
describe("markup schema field", () => {
    const SchemaField = createSchemaField({
        components: {
            ArrayComponent,
            Input,
            ObjectComponent,
            TextComponent,
            VoidComponent,
        },
    });
    const Markup: FC<PropsWithChildren<{ form: Form }>> = ({ children, form }) => (
        <FormProvider form={form}>
            <SchemaField>{children}</SchemaField>
        </FormProvider>
    );

    // 字符节点
    test("string", () => {
        const form = createForm();
        const { queryByTestId } = render(
            <Markup form={form}>
                <SchemaField.String x-component="Input" />
            </Markup>,
        );
        expect(queryByTestId("input")).toBeVisible();
    });

    // 布尔节点
    test("boolean", () => {
        const form = createForm();
        const { queryByTestId } = render(
            <Markup form={form}>
                <SchemaField.Boolean x-component="Input" />
            </Markup>,
        );
        expect(queryByTestId("input")).toBeVisible();
    });

    // 数值节点
    test("number", () => {
        const form = createForm();
        const { queryByTestId } = render(
            <Markup form={form}>
                <SchemaField.Number x-component="Input" />
            </Markup>,
        );
        expect(queryByTestId("input")).toBeVisible();
    });

    // 日期节点
    test("date", () => {
        const form = createForm();
        const { queryByTestId } = render(
            <Markup form={form}>
                <SchemaField.Date x-component="Input" />
            </Markup>,
        );
        expect(queryByTestId("input")).toBeVisible();
    });

    // 日期时间节点
    test("datetime", () => {
        const form = createForm();
        const { queryByTestId } = render(
            <Markup form={form}>
                <SchemaField.DateTime x-component="Input" />
            </Markup>,
        );
        expect(queryByTestId("input")).toBeVisible();
    });

    // 虚拟节点
    test("void", () => {
        const form = createForm();
        const { queryByTestId } = render(
            <Markup form={form}>
                <SchemaField.Void x-component="VoidComponent" />
            </Markup>,
        );
        expect(queryByTestId("void-component")).toBeVisible();
    });

    // 数组节点
    test("array", () => {
        const form = createForm();
        const { queryByTestId } = render(
            <Markup form={form}>
                <SchemaField.Array name="array" default={[{ input: "" }]} x-component="ArrayComponent" />
            </Markup>,
        );
        expect(queryByTestId("input")).toBeVisible();
    });

    // 对象节点
    test("object", () => {
        const form = createForm();
        const { queryByTestId } = render(
            <Markup form={form}>
                <SchemaField.Object name="object" default={{ input: "" }} x-component="ObjectComponent" />
            </Markup>,
        );
        expect(queryByTestId("input")).toBeVisible();
    });

    // 其他节点
    test("other", () => {
        const form = createForm();
        const { queryByTestId } = render(
            <Markup form={form}>
                <SchemaField.Markup name="other" type="other" x-component="TextComponent">
                    <SchemaField.Markup />
                </SchemaField.Markup>
            </Markup>,
        );
        expect(queryByTestId("text-component")).toBeVisible();
    });

    // 当节点是 Void 的时候，是可以接受 children 的，而节点是 Markup 的时候不接受 children
    test("no parent", () => {
        const form = createForm();
        const { container, queryByTestId, queryAllByTestId } = render(
            <Markup form={form}>
                <SchemaField.Markup name="other" type="other" x-component="TextComponent">
                    <SchemaField.String x-component="Input" />
                </SchemaField.Markup>
                <SchemaField.Void name="other" type="other" x-component="TextComponent">
                    <SchemaField.String x-component="Input" />
                </SchemaField.Void>
            </Markup>,
        );
        // 忽略第一个，自然也拿不到 parent，拿到 void 下的 input
        expect(queryAllByTestId("input").length).toBe(1);
        expect(queryByTestId("input")).toBeVisible();
    });

    // 子节点 - 通过 props 设置 children
    test("props children", () => {
        const form = createForm();
        const { queryByTestId } = render(
            <Markup form={form}>
                <SchemaField.Void
                    x-component="TextComponent"
                    x-component-props={{ children: "props", name: "children-test" }}
                />
            </Markup>,
        );
        expect(queryByTestId("children-test")).toBeVisible();
        expect(queryByTestId("children-test")?.innerHTML).toEqual("props");
    });

    // 通过 x-content 设置 children
    test("x-content", () => {
        const form = createForm();
        const { queryByTestId } = render(
            <Markup form={form}>
                <SchemaField.Void
                    x-component="TextComponent"
                    x-content="content"
                    x-component-props={{ name: "content-test" }}
                />
            </Markup>,
        );

        expect(queryByTestId("content-test")).toBeVisible();
        expect(queryByTestId("content-test")?.innerHTML).toEqual("content");
    });
});

// 字段递归
describe("recursion field", () => {
    const SchemaField = createSchemaField({
        components: {
            CustomObject,
            Input,
        },
    });
    const Markup: FC<PropsWithChildren<{ form: Form }>> = ({ children, form }) => (
        <FormProvider form={form}>
            <SchemaField>{children}</SchemaField>
        </FormProvider>
    );

    // 只渲染 schema properties
    test("onlyRenderProperties", () => {
        const form = createForm();
        const { queryAllByTestId } = render(
            <Markup form={form}>
                <SchemaField.Object x-component="CustomObject" x-component-props={{ onlyRenderProperties: false }}>
                    <SchemaField.String x-component="Input" />
                </SchemaField.Object>
                <SchemaField.Object x-component="CustomObject" x-component-props={{ name: "only-properties" }}>
                    <SchemaField.String x-component="Input" />
                </SchemaField.Object>
                <SchemaField.Void x-component="CustomObject" x-component-props={{ name: "only-properties" }}>
                    <SchemaField.String x-component="Input" />
                </SchemaField.Void>
            </Markup>,
        );

        expect(queryAllByTestId("input").length).toEqual(3);
        expect(queryAllByTestId("object").length).toEqual(1);
        expect(queryAllByTestId("only-properties").length).toEqual(2);
    });
});
