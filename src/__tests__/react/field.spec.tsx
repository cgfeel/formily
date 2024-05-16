import { createForm, Field as FieldType, isArrayField, isField, onFieldChange, onFieldUnmount } from "@formily/core";
import {
    ArrayField,
    Field,
    FormProvider,
    ObjectField,
    VoidField,
    connect,
    mapProps,
    mapReadPretty,
    observer,
    useField,
    useFormEffects,
} from "@formily/react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { FC } from "react";
import { Button, Input as InputRaw, TextComponent } from "./SchemaComs";

// 没有上下文渲染字段 - 由于在开发环境无论如何都会抛出错误，所以这里暂且屏蔽测试，如有必要自行打开
// import { expectThrowError } from "./shared";
/*test("render field no context", () => {
    expectThrowError(() => (
        <>
            <Field name="aa">
                <div>123</div>
            </Field>
            <ArrayField name="bb">
                <div>123</div>
            </ArrayField>
            <ObjectField name="cc" />
            <ObjectField name="dd" />
        </>
    ));
});*/

// 响应字段的测试，这个字段不对外导出，可以通过 ArrayField 进行了解
/*test('ReactiveField', () => {
    render(<ReactiveField field={null} />)
    render(<ReactiveField field={null}>{() => <div></div>}</ReactiveField>)
});*/

const CustomField = connect(
    Button,
    mapProps({ initialValue: "testid", disabled: true }, (props, field) => ({
        ...props,
        mounted: field.mounted ? 1 : 2,
    })),
    // initialValue 在这里丢失了
    mapReadPretty(({ initialValue, value }) => (
        <div data-testid="custom-read">
            read pretty {initialValue || "text-component"} {value}
        </div>
    )),
);

const Input = connect(
    InputRaw,
    mapProps((props, field) => ({ ...props, testid: field.path.toString() })),
    // testid 在这里丢失了
    mapReadPretty(({ testid, value }) => (
        <div data-testid="input-read">
            {value}-{testid}
        </div>
    )),
);

// 只要是 value 后面的属性一定是字段值，不用被 type 这样的名字唬到
// 这里的意思是如果当前的字段值下有个 type 为 mouted 的值，就嵌套一个子组件
const ParentChild: FC = () => {
    const field = useField<FieldType>();
    return field.value?.type === "mouted" ? (
        <Field name="child" component={[Input]} validator={{ required: true }} />
    ) : (
        <div data-testid="unmounted"></div>
    );
};

// 渲染字段
test("render field", async () => {
    const form = createForm();
    const onChange = jest.fn();

    const { getByTestId, queryByTestId, unmount } = render(
        <FormProvider form={form}>
            <Field name="aa" component={[Input, { onChange }]} decorator={[TextComponent]} />
            <ArrayField name="bb" decorator={[TextComponent]}>
                <div data-testid="bb-children"></div>
            </ArrayField>
            <ObjectField name="cc" decorator={[TextComponent]}>
                <Field name="mm" component={[Input]} decorator={[TextComponent]} />
                <ObjectField name="pp" decorator={[TextComponent]} />
                <ArrayField name="tt" decorator={[TextComponent]} />
                <VoidField name="ww" />
            </ObjectField>
            <VoidField name="dd" decorator={[TextComponent]}>
                {() => (
                    <div data-testid="dd-children">
                        <Field name="oo" component={[Input]} decorator={[TextComponent]} />
                    </div>
                )}
            </VoidField>
            <VoidField name="xx" component={[TextComponent]} decorator={[TextComponent]} />
            <Field name="ee" visible={false} component={[Input]} decorator={[TextComponent]} />
            <Field name="ff" visible={false} component={[]} decorator={[]} />
            {/** @ts-ignore 容错测试 */}
            <Field name="gg" visible={false} component={null} decorator={null} />
            <Field name="hh" visible={false} component={[null]} decorator={[null, null]} />
            <Field name="kk" component={[Input, { onChange: null }]} decorator={[TextComponent]} />
        </FormProvider>,
    );
    expect(form.mounted).toBeTruthy();
    expect(form.query("aa").take()?.mounted).toBeTruthy();
    expect(form.query("bb").take()?.mounted).toBeTruthy();
    expect(form.query("cc").take()?.mounted).toBeTruthy();
    expect(form.query("dd").take()?.mounted).toBeTruthy();

    fireEvent.change(getByTestId("aa"), {
        target: { value: "123" },
    });

    // 字段 kk 没有调用监听函数，不会触发执行
    fireEvent.change(getByTestId("kk"), {
        target: { value: "123" },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(getByTestId("bb-children")).toBeVisible();
    expect(getByTestId("dd-children")).toBeVisible();

    // 被隐藏的字段需要通过 queryByTestId，使用 getByTestId 获取节点找不到会抛出错误
    expect(queryByTestId("ee")).toBeNull();
    expect(form.query("aa").get("value")).toEqual("123");
    expect(form.query("kk").get("value")).toEqual("123");
    unmount();
});

// 字段属性基础操作
test("useAttach basic", async () => {
    const form = createForm();
    const MyComponent: FC<{ name: string }> = ({ name }) => (
        <FormProvider form={form}>
            <Field component={[Input]} decorator={[TextComponent]} name={name} />
        </FormProvider>
    );

    const { rerender } = render(<MyComponent name="aa" />);
    expect(form.query("aa").take()?.mounted).toBeTruthy();

    rerender(<MyComponent name="bb" />);
    await waitFor(() => {
        expect(form.query("aa").take()?.mounted).toBeFalsy();
        expect(form.query("bb").take()?.mounted).toBeTruthy();
    });
});

// 数组字段属性
test("useAttach with array field", async () => {
    const form = createForm();
    const MyComponent: FC = () => (
        <FormProvider form={form}>
            <ArrayField name="array" initialValue={[{ input: "11" }, { input: "22" }]}>
                {field =>
                    field.value.map((_, index) => (
                        <Field component={[Input]} decorator={[TextComponent]} key={index} name={`${index}.input`} />
                    ))
                }
            </ArrayField>
        </FormProvider>
    );
    render(<MyComponent />);
    await waitFor(() => {
        expect(form.query("array.0.input").take()?.mounted).toBeTruthy();
        expect(form.query("array.1.input").take()?.mounted).toBeTruthy();
        expect(form.query("array.0.input").value()).toEqual("11");
        expect(form.query("array.1.input").value()).toEqual("22");
    });

    act(() => {
        // 将下标 1 的字段向下移动一位
        form.query("array").take(field => isArrayField(field) && field.moveDown(0));
    });

    await waitFor(() => {
        // 移动后字段依旧存在
        expect(form.query("array.0.input").take()?.mounted).toBeTruthy();
        expect(form.query("array.1.input").take()?.mounted).toBeTruthy();

        // 通过值知道位置已经改变
        expect(form.query("array.1.input").value()).toEqual("11");
        expect(form.query("array.0.input").value()).toEqual("22");
    });
});

// 注入副作用逻辑，文档中为组件添加了无用的 props tag 并重新渲染 rerender，这里去掉了
test("useFormEffects", async () => {
    const form = createForm();
    const CustomField = observer(() => {
        const field = useField<FieldType>();
        useFormEffects(() => {
            onFieldChange("aa", ["value"], target => isField(target) && field.setValue(target.value));
        });

        return <div data-testid="custom-value">{field.value}</div>;
    });

    const { queryByTestId } = render(
        <FormProvider form={form}>
            <Field name="aa" component={[Input]} decorator={[TextComponent]} />
            <Field name="bb" component={[CustomField]} decorator={[TextComponent]} />
        </FormProvider>,
    );

    expect(queryByTestId("custom-value")?.textContent).toEqual("");
    act(() => {
        form.query("aa").take(target => isField(target) && target.setValue("123"));
    });

    await waitFor(() => {
        expect(queryByTestId("custom-value")?.textContent).toEqual("123");
    });
});

// 第三方组件库的无侵入接入 Formily
// 由于其他单例已经创建了组件，这里就直接使用接入为新的组件，这样更符合实际开发场景
test("content", async () => {
    const form = createForm();
    const MyComponent: FC = () => (
        <FormProvider form={form}>
            <Field name="aa" component={[CustomField]} decorator={[TextComponent]} />
            <Field initialValue="123" name="bb" component={[Input]} decorator={[TextComponent]} />
        </FormProvider>
    );

    const { queryByTestId } = render(<MyComponent />);
    act(() => {
        form.query("aa").take(
            field =>
                isField(field) &&
                field.setState(state => {
                    state.initialValue = "custom-field";
                }),
        );
    });

    // CustomField 会自动将 initialValue 转换为 testid，Input 会自动将 path 转换为 testid
    await waitFor(() => {
        expect(queryByTestId("custom-field")).toBeVisible();
        expect(queryByTestId("bb")).toBeVisible();
        expect(form.values.bb).toEqual("123");
    });

    act(() => {
        form.setState(state => {
            state.pattern = "readPretty";
        });
    });

    // 当 pattern 为 readPretty 的时候 initivalValue 会丢失，保留 value
    // 自定义测 props testid 也会 丢失
    await waitFor(() => {
        expect(queryByTestId("custom-read")?.innerHTML).toEqual("read pretty text-component custom-field");
        expect(queryByTestId("input-read")?.innerHTML).toEqual("123-");
    });
});

// 字段验证和卸载
test("field unmount and validate", async () => {
    const fn = jest.fn();
    const Parent = observer(ParentChild);

    // 创建一个带有初始值的表单，初始值字段为 { parent: { type: "mouted" } }
    const form = createForm({
        initialValues: {
            parent: {
                type: "mouted",
            },
        },
        effects: () => {
            onFieldUnmount("parent.child", fn);
        },
    });

    // 这里用组件 Parent 能够说明 Field 是可以层层嵌套的
    const MyComponent: FC = () => (
        <FormProvider form={form}>
            <div data-testid="container">
                <Field name="parent" component={[Parent]} />
            </div>
        </FormProvider>
    );

    const { queryByTestId } = render(<MyComponent />);
    try {
        await form.validate();
    } catch {}

    // 表单不合理的原因是因为 child 这个必填字段成功挂载，而触发了验证不通过
    expect(form.invalid).toBeTruthy();
    expect(form.query("parent.child").take()?.mounted).toBeTruthy();
    expect(fn).toHaveBeenCalledTimes(0);

    // 这个时候 input 还是存在的
    expect(queryByTestId("parent.child")).toBeVisible();

    act(() => {
        form.query("parent").take(field =>
            field.setState(state => {
                state.value.type = "unmounted";
            }),
        );
    });

    // 更改值后，组件被卸载
    await waitFor(() => {
        expect(fn).toHaveBeenCalledTimes(1);
    });

    try {
        await form.validate();
    } catch {}

    // 这件事告诉我们即便
    expect(form.invalid).toBeTruthy();

    // 巩固，字段节点卸载后并不会影响表单验证，也不影响表单中已经存在卸载字段的事实
    expect(queryByTestId("parent.child")).toBeNull();
    expect(queryByTestId("unmounted")).toBeVisible();

    // 如果要彻底清除字段，可以隐藏字段
    act(() => {
        form.query("parent.child").take(field =>
            field.setState(state => {
                state.display = "none";
            }),
        );
    });

    try {
        await form.validate();
    } catch {}

    await waitFor(() => {
        expect(form.invalid).toBeFalsy();
    });

    // 如果要彻底清除字段，可以通过回收字段的方式
    act(() => {
        form.query("parent.child").take(field =>
            field.setState(state => {
                state.display = "visible";
            }),
        );
        form.clearFormGraph("*");
    });

    try {
        await form.validate();
    } catch {}

    await waitFor(() => {
        expect(form.invalid).toBeFalsy();
    });
});
