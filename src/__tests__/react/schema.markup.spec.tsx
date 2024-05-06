import { createForm } from "@formily/core";
import { FormProvider, createSchemaField } from "@formily/react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { FC, PropsWithChildren } from "react";
import {
    ArrayComponent,
    CustomObject,
    IllegalObject,
    Input,
    MarkupProps,
    ObjectComponent,
    TextComponent,
    VoidComponent,
} from "./SchemaComs";

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
    const Markup: FC<PropsWithChildren<MarkupProps>> = ({ children, form }) => (
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
            IllegalObject,
            Input,
            TextComponent,
        },
    });
    const Markup: FC<PropsWithChildren<MarkupProps>> = ({ children, form, ...props }) => (
        <FormProvider form={form}>
            <SchemaField {...props}>{children}</SchemaField>
        </FormProvider>
    );

    // 只渲染 schema properties，在一个对象字段中，子节点都是 properties
    // 实际测试过程中，加上 onlyRenderProperties 会将自身作为子集
    // 这个时候如果给 RecursionField 加上 path，就会无限循环，反之则不会将自身作为子集
    test("onlyRenderProperties", () => {
        const form = createForm();
        const { queryAllByTestId } = render(
            <Markup form={form}>
                <SchemaField.Object x-component="CustomObject">
                    <SchemaField.String x-component="Input" />
                </SchemaField.Object>
                <SchemaField.Object
                    x-component="CustomObject"
                    x-component-props={{
                        name: "only-properties",
                        onlyRenderProperties: true,
                    }}>
                    <SchemaField.String x-component="Input" />
                </SchemaField.Object>
                <SchemaField.Void
                    x-component="CustomObject"
                    x-component-props={{
                        name: "only-properties",
                        onlyRenderProperties: true,
                    }}>
                    <SchemaField.String x-component="Input" />
                </SchemaField.Void>
            </Markup>,
        );

        expect(queryAllByTestId("input").length).toEqual(3);
        expect(queryAllByTestId("object").length).toEqual(1);
        expect(queryAllByTestId("only-properties").length).toEqual(2);
    });

    // schema properties映射器，主要用于改写schema
    test("mapProperties", () => {
        const form = createForm();
        const { queryAllByTestId } = render(
            <Markup form={form}>
                <SchemaField.Object
                    x-component="CustomObject"
                    x-component-props={{
                        mapProperties: schema => {
                            // 会为对象字段下的所有字段设置默认值为 "123"
                            schema.default = "123";
                            return schema;
                        },
                    }}>
                    <SchemaField.String name="input" x-component="Input" />
                    <SchemaField.String name="input1" x-component="Input" />
                </SchemaField.Object>
                <SchemaField.Object
                    x-component="CustomObject"
                    x-component-props={{
                        mapProperties: schema => {
                            // 最后一个字段文档中 mapProperties 返回了 null，这是不允许的，需要返回一个 schema
                            schema.default = "";
                            return schema;
                        },
                    }}>
                    <SchemaField.String default="321" name="input" x-component="Input" />
                </SchemaField.Object>
            </Markup>,
        );

        expect(queryAllByTestId("input").length).toBe(3);
        expect(queryAllByTestId("input")[0].getAttribute("value")).toEqual("123");
        expect(queryAllByTestId("input")[1].getAttribute("value")).toEqual("123");
        expect(queryAllByTestId("input")[2].getAttribute("value")).toEqual("");
    });

    // schema properties过滤器，被过滤掉的schema节点不会被渲染
    test("filterProperties", () => {
        const form = createForm();
        const { queryAllByTestId } = render(
            <Markup form={form}>
                <SchemaField.Object
                    x-component="CustomObject"
                    x-component-props={{
                        filterProperties: schema => schema["x-component"] !== "Input",
                    }}>
                    <SchemaField.String x-component="Input" />
                </SchemaField.Object>
                <SchemaField.Object
                    x-component="CustomObject"
                    x-component-props={{
                        filterProperties: schema => schema["x-component"] === "Input",
                    }}>
                    <SchemaField.String x-component="Input" />
                </SchemaField.Object>
            </Markup>,
        );

        expect(queryAllByTestId("input").length).toBe(1);
        expect(queryAllByTestId("object").length).toBe(2);
    });

    // 是否只渲染自身，不渲染properties
    test("onlyRenderSelf", () => {
        const form = createForm();
        const { queryAllByTestId } = render(
            <Markup form={form}>
                <SchemaField.Object
                    x-component="CustomObject"
                    x-component-props={{
                        onlyRenderSelf: true,
                    }}>
                    <SchemaField.String x-component="Input" />
                </SchemaField.Object>
            </Markup>,
        );

        expect(queryAllByTestId("input").length).toBe(0);
        expect(queryAllByTestId("object").length).toBe(1);
    });

    // 引入一个无效的 schema
    test("illegal schema", () => {
        const form = createForm();
        const { queryByTestId } = render(
            <Markup form={form}>
                <SchemaField.Object x-component="IllegalObject">
                    <SchemaField.String x-component="Input" />
                </SchemaField.Object>
                <SchemaField.Object x-component="IllegalObject" x-component-props={{ schema: {} }}>
                    <SchemaField.String x-component="Input" />
                </SchemaField.Object>
            </Markup>,
        );
        expect(queryByTestId("input")).toBeNull();
    });

    // schema 联动
    test("schema reactions", async () => {
        const form = createForm();
        const { queryByTestId } = render(
            <Markup form={form}>
                <SchemaField.String name="aaa" x-component="Input" x-component-props={{ testid: "aaa" }} />
                <SchemaField.String
                    name="bbb"
                    x-component="Input"
                    x-component-props={{ testid: "bbb" }}
                    x-reactions={[
                        {
                            when: "{{$form.values.aaa === '123'}}",
                            fulfill: {
                                state: { visible: true },
                            },
                            otherwise: {
                                state: { visible: false },
                            },
                        },
                        {
                            target: "ccc",
                            when: "{{$self.value === '123'}}",
                            fulfill: {
                                schema: { "x-visible": true },
                            },
                            otherwise: {
                                schema: { "x-visible": false },
                            },
                        },
                    ]}
                />
                <SchemaField.String name="ccc" x-component="Input" x-component-props={{ testid: "ccc" }} />
            </Markup>,
        );

        expect(queryByTestId("bbb")).toBeNull();

        const aaa = queryByTestId("aaa");
        aaa && fireEvent.change(aaa, { target: { value: "123" } });
        await waitFor(() => {
            expect(queryByTestId("bbb")).toBeVisible();
        });

        expect(queryByTestId("ccc")).toBeNull();

        const bbb = queryByTestId("bbb");
        bbb && fireEvent.change(bbb, { target: { value: "123" } });
        await waitFor(() => {
            expect(queryByTestId("ccc")).toBeVisible();
        });
    });

    // 作用域范围
    test("expression scope", async () => {
        const form = createForm();
        const info = {
            aa: false,
            bb: false,
            cc: false,
        };

        const SchemaField = createSchemaField({
            components: { Input },
            scope: {
                aa: () => {
                    info.aa = true;
                },
            },
        });

        const { queryByTestId } = render(
            <FormProvider form={form}>
                <SchemaField
                    scope={{
                        bb() {
                            info.bb = true;
                        },
                        cc() {
                            info.cc = true;
                        },
                    }}>
                    <SchemaField.String
                        name="aa"
                        x-component="Input"
                        x-component-props={{ testid: "aa" }}
                        x-reactions="{{aa}}"
                    />
                    <SchemaField.String
                        name="bb"
                        x-component="Input"
                        x-component-props={{ testid: "bb" }}
                        x-reactions="{{bb}}"
                    />
                    <SchemaField.String
                        name="cc"
                        x-component="Input"
                        x-component-props={{ testid: "cc" }}
                        x-reactions={{
                            dependencies: ["aa"],
                            fulfill: {
                                run: "{{cc()}}",
                            },
                        }}
                    />
                </SchemaField>
            </FormProvider>,
        );

        await waitFor(() => expect(queryByTestId("aa")).toBeVisible());
        expect(info.aa).toBeTruthy();

        await waitFor(() => expect(queryByTestId("bb")).toBeVisible());
        expect(info.bb).toBeTruthy();

        await waitFor(() => expect(queryByTestId("cc")).toBeVisible());
        expect(info.cc).toBeTruthy();
    });

    // x-content 通过作用域将组件作为子集插入
    test("expression x-content", async () => {
        const form = createForm();
        const { queryByTestId } = render(
            <Markup
                form={form}
                scope={{
                    child: <div data-testid="child"></div>,
                }}>
                <SchemaField.Void name="aaa" x-component="TextComponent" x-content="{{child}}" />
            </Markup>,
        );
        await waitFor(() => {
            expect(queryByTestId("child")).toBeVisible();
        });
    });

    // 作用域内隐藏和展示
    test("expression x-visible", async () => {
        const form = createForm();
        const { container, queryByText } = render(
            <Markup form={form}>
                <SchemaField.String name="aaa" x-component="TextComponent" x-content="AAA" />
                <SchemaField.String
                    name="bbb"
                    x-component="TextComponent"
                    x-content="BBB"
                    x-visible="{{$form.values.aaa === '123'}}"
                />
            </Markup>,
        );

        await waitFor(() => {
            expect(queryByText("BBB")).toBeNull();
        });

        act(() => {
            form.values.aaa = "123";
        });

        await waitFor(() => {
            expect(queryByText("BBB")).toBeVisible();
        });
    });

    // 作用域联动设置值
    test("expression x-value", async () => {
        const form = createForm({
            values: { aaa: 1 },
        });
        const { queryByPlaceholderText } = render(
            <Markup form={form}>
                <SchemaField.String name="aaa" x-component="Input" />
                <SchemaField.String
                    name="bbb"
                    x-component="Input"
                    x-component-props={{ placeholder: "bbb text" }}
                    x-value="{{$form.values.aaa * 10}}"
                />
            </Markup>,
        );

        await waitFor(() => {
            const bbb = queryByPlaceholderText("bbb text");
            expect(bbb instanceof HTMLInputElement ? bbb.value : undefined).toEqual("10");
        });

        act(() => {
            form.values.aaa = 10;
        });

        await waitFor(() => {
            const bbb = queryByPlaceholderText("bbb text");
            expect(bbb instanceof HTMLInputElement ? bbb.value : undefined).toEqual("100");
        });
    });

    // 通过作用域嵌套更新组件属性
    test("nested update component props with expression", async () => {
        const form = createForm({
            values: {
                aaa: "xxx",
            },
        });

        const Text: FC<{ aa?: { bb?: { cc?: string } } }> = props => <div>{props.aa?.bb?.cc}</div>;
        const SchemaField = createSchemaField({
            components: {
                Input,
                Text,
            },
        });

        const { queryByText } = render(
            <FormProvider form={form}>
                <SchemaField>
                    <SchemaField.String name="aaa" x-component="Input" />
                    <SchemaField.String
                        name="bbb"
                        x-component="Text"
                        x-component-props={{ aa: { bb: { cc: "{{$form.values.aaa}}" } } }}
                    />
                </SchemaField>
            </FormProvider>,
        );

        await waitFor(() => {
            expect(queryByText("xxx")).toBeVisible();
        });

        act(() => {
            form.values.aaa = "10";
        });

        await waitFor(() => {
            expect(queryByText("10")).toBeVisible();
        });
    });

    // 通过联动嵌套更新组件属性
    test("nested update component props with x-reactions", async () => {
        const form = createForm({
            values: {
                aaa: "xxx",
            },
        });

        const Text: FC<{ aa?: { bb?: { cc?: string } } }> = props => <div>{props.aa?.bb?.cc}</div>;
        const { queryByText } = render(
            <Markup components={{ Text }} form={form}>
                <SchemaField.String name="aaa" x-component="Input" />
                <SchemaField.String
                    name="bbb"
                    x-component="Text"
                    x-reactions={{
                        fulfill: {
                            schema: {
                                "x-component-props.aa.bb.cc": "{{$form.values.aaa}}",
                            },
                        },
                    }}
                />
            </Markup>,
        );

        await waitFor(() => {
            expect(queryByText("xxx")).toBeVisible();
        });

        act(() => {
            form.values.aaa = "10";
        });

        await waitFor(() => {
            expect(queryByText("10")).toBeVisible();
        });
    });

    // 模型验证和必填
    test("schema x-validator/required", async () => {
        const form = createForm({
            values: {
                aaa: "xxx",
            },
        });
        render(
            <Markup form={form}>
                <SchemaField.String name="input" x-component="Input" x-validator="email" required />
            </Markup>,
        );

        await waitFor(() => {
            expect(form.query("input").get("required")).toBeTruthy();
            expect(form.query("input").get("validator")).toEqual([{ required: true }, { format: "email" }]);
        });
    });
});
