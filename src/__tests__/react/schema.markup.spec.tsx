import { createForm } from "@formily/core";
import { FormProvider, RecordScope, RecordsScope, createSchemaField } from "@formily/react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { FC, PropsWithChildren } from "react";
import {
    ArrayComponent,
    Button,
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
            Button,
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
    // 不加 onlyRenderProperties 会渲染自身，这个时候再加上 name 和 basePath，就会一层层无限循环
    // 加上这个属性就只渲染 properties，也就会避免上述说的无限循环
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

    // 模型根据值响应
    test("schema x-reactions when undefined", async () => {
        const form = createForm();
        const { queryByTestId } = render(
            <Markup form={form}>
                <SchemaField.String name="input" x-component="Input" required />
                <SchemaField.String
                    name="select"
                    x-component="Input"
                    x-component-props={{ testid: "select" }}
                    x-reactions={{
                        when: "{{$values.input}}",
                        fulfill: {
                            state: {
                                visible: true,
                            },
                        },
                        otherwise: {
                            state: {
                                visible: false,
                            },
                        },
                    }}
                    required
                />
            </Markup>,
        );
        await waitFor(() => {
            expect(queryByTestId("input")).toBeVisible();
            expect(queryByTestId("select")).toBeNull();
        });
        act(() => {
            form.values.input = "123";
        });
        await waitFor(() => {
            expect(queryByTestId("input")).toBeVisible();
            expect(queryByTestId("select")).toBeVisible();
        });
    });

    // 虚拟节点的子集
    test("void field children", async () => {
        const form = createForm();
        const { queryByTestId } = render(
            <Markup form={form}>
                <SchemaField.Void
                    x-component="TextComponent"
                    x-component-props={{ name: "btn" }}
                    x-content="placeholder"
                />
            </Markup>,
        );
        await waitFor(() => {
            expect(queryByTestId("btn")?.textContent).toEqual("placeholder");
        });
    });

    // 在响应执行过程中，调用第三方字段的值
    test("x-reactions runner for target", async () => {
        const form = createForm();
        const getTarget = jest.fn();

        // 这里的 button 使用 value 作为 children，而通过 onChange 触发更新 value
        const { queryByTestId } = render(
            <Markup form={form} scope={{ getTarget }}>
                <SchemaField.String default="333" name="target" x-component="Input" />
                <SchemaField.String
                    x-component="Button"
                    x-content="Click"
                    x-component-props={{
                        onClick: (event, onChange) => {
                            event.preventDefault();
                            onChange && onChange(" 123");
                        },
                    }}
                    // 这里 onFieldInputValueChange 的作用是，当自身的值改变后执行响应，并将目标对象的值传过去
                    // 而发起改变是通过 click 中发起 onChange
                    x-reactions={[
                        {
                            target: ["target"],
                            effects: ["onFieldInputValueChange"],
                            fulfill: {
                                run: "{{getTarget($target.value)}}",
                            },
                        },
                    ]}
                />
            </Markup>,
        );

        const btn = queryByTestId("btn");
        expect(btn).toBeVisible();

        btn && fireEvent.click(btn);
        await waitFor(() => {
            expect(queryByTestId("btn")?.textContent).toEqual("Click 123");
            expect(getTarget).toHaveBeenCalledWith("333");
            expect(getTarget).toHaveBeenCalledTimes(1);
        });
    });

    // 多个响应的副作用隔离
    test("multi x-reactions isolate effect", async () => {
        const form = createForm();
        const otherEffect = jest.fn();
        const { getByTestId, queryByTestId } = render(
            <Markup form={form}>
                <SchemaField.String
                    name="target"
                    x-component="Input"
                    x-reactions={[
                        otherEffect,
                        {
                            dependencies: ["btn"],
                            fulfill: {
                                state: {
                                    visible: "{{$deps[0] === '123'}}",
                                },
                            },
                        },
                    ]}
                />
                <SchemaField.String
                    name="btn"
                    x-component="Button"
                    x-content="Click "
                    x-component-props={{
                        onClick: (event, onChange) => {
                            event.preventDefault();
                            onChange && onChange("123");
                        },
                    }}
                />
            </Markup>,
        );
        await waitFor(() => {
            expect(queryByTestId("input")).toBeNull();
        });

        fireEvent.click(getByTestId("btn"));
        await waitFor(() => {
            expect(getByTestId("btn").textContent).toEqual("Click 123");
            expect(getByTestId("input")).toBeVisible();
            expect(otherEffect).toHaveBeenCalledTimes(1);
        });

        // 修改值只想做一个测试，otherEffect 只在初始化时执行一次，不会随着每次联动调用
        // 因为它的内部并没有通过 field.query 或 form.values 添加依赖
        act(() => {
            form.values.btn = "321";
        });

        await waitFor(() => {
            expect(getByTestId("btn").textContent).toEqual("Click 321");
            expect(queryByTestId("input")).toBeNull();
            expect(otherEffect).toHaveBeenCalledTimes(1);
        });
    });

    // 嵌套作用域集合 - 这里 RecordScope 一定要在 FormProvider 内部，SchemaField 外部
    test("nested record scope", async () => {
        const form = createForm();
        const { queryByTestId } = render(
            <FormProvider form={form}>
                <RecordScope getIndex={() => 1} getRecord={() => ({ bb: "321" })}>
                    <RecordScope getIndex={() => 2} getRecord={() => ({ aa: "123" })}>
                        <SchemaField>
                            <SchemaField.Void
                                x-component="TextComponent"
                                x-content="{{$record.aa + $record.$lookup.bb + $index + $lookup.$index}}"
                                x-component-props={{ name: "text" }}
                            />
                        </SchemaField>
                    </RecordScope>
                </RecordScope>
            </FormProvider>,
        );
        await waitFor(() => {
            expect(queryByTestId("text")?.textContent).toEqual("12332121");
        });
    });

    // 作用域集合字面量 - 这里 RecordScope 一定要在 FormProvider 内部，SchemaField 外部
    test("literal record scope", async () => {
        const form = createForm();
        const { queryByTestId } = render(
            <FormProvider form={form}>
                <RecordScope getIndex={() => 2} getRecord={() => "123"}>
                    <SchemaField>
                        <SchemaField.Void
                            x-component="TextComponent"
                            x-content="{{$record + $index}}"
                            x-component-props={{ name: "text" }}
                        />
                    </SchemaField>
                </RecordScope>
            </FormProvider>,
        );
        await waitFor(() => {
            expect(queryByTestId("text")?.textContent).toEqual("1232");
        });
    });

    // 作用域集合 - 这里 RecordScope 一定要在 FormProvider 内部，SchemaField 外部
    test("records scope", async () => {
        const form = createForm();
        const { queryByTestId } = render(
            <FormProvider form={form}>
                <RecordsScope getRecords={() => [1, 2, 3]}>
                    <SchemaField>
                        <SchemaField.Void
                            x-component="TextComponent"
                            x-content="{{$records[2]}}"
                            x-component-props={{ name: "text" }}
                        />
                    </SchemaField>
                </RecordsScope>
            </FormProvider>,
        );
        await waitFor(() => {
            expect(queryByTestId("text")?.textContent).toEqual("3");
        });
    });

    // 是否递归传递 mapProperties 和 filterProperties
    // mapProperties: schema properties映射器，主要用于改写schema
    // filterProperties: schema properties过滤器，被过滤掉的schema节点不会被渲染
    test("propsRecursion as true", () => {
        const form = createForm();
        const { queryAllByTestId } = render(
            <Markup form={form}>
                <SchemaField.Object
                    x-component="CustomObject"
                    x-component-props={{
                        propsRecursion: true,
                        filterProperties: schema => schema["x-component"] !== "Input",
                    }}>
                    <SchemaField.String x-component="Input" />
                    <SchemaField.Object x-component="TextComponent" x-component-props={{ name: "text" }}>
                        <SchemaField.String x-component="Input" />
                    </SchemaField.Object>
                </SchemaField.Object>
            </Markup>,
        );

        // object 是 RecursionField 本身的 testid，所以我加了一个组件 TextComponent
        // 这样就证明了只过滤了组件 Input
        expect(queryAllByTestId("input").length).toBe(0);
        expect(queryAllByTestId("object").length).toBe(1);
        expect(queryAllByTestId("text").length).toBe(1);
    });

    // 不提供 propsRecursion 过滤 schema 只能过滤下一级字段，对于更深层次的字段不能过滤
    test("propsRecursion as empty", () => {
        const form = createForm();
        const { queryAllByTestId } = render(
            <Markup form={form}>
                <SchemaField.Object
                    x-component="CustomObject"
                    x-component-props={{
                        filterProperties: schema => schema["x-component"] !== "Input",
                    }}>
                    <SchemaField.String x-component="Input" />
                    <SchemaField.Object x-component="TextComponent" x-component-props={{ name: "text" }}>
                        <SchemaField.String x-component="Input" />
                    </SchemaField.Object>
                </SchemaField.Object>
            </Markup>,
        );
        expect(queryAllByTestId("input").length).toBe(1);
        expect(queryAllByTestId("object").length).toBe(1);
        expect(queryAllByTestId("text").length).toBe(1);
    });
});
