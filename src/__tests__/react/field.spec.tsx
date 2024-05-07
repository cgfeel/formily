import { createForm } from "@formily/core";
import { ArrayField, Field, FormProvider, ObjectField, VoidField, useField } from "@formily/react";
import { fireEvent, render } from "@testing-library/react";
import { FC } from "react";
import { Input as InputRaw, InputProps, TextComponent } from "./SchemaComs";

const Input: FC<Omit<InputProps, "testid">> = props => {
    const field = useField();
    return <InputRaw {...props} testid={field.path.toString()} />;
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
