import { 
    createForm, 
    isField, 
    onFieldChange, 
    onFieldInit, 
    onFieldInitialValueChange, 
    onFieldInputValueChange, 
    onFieldMount, 
    onFieldReact, 
    onFieldUnmount, 
    onFieldValueChange, 
    onFormInit, 
    onFormInitialValuesChange, 
    onFormInputChange, 
    onFormMount, 
    onFormReact, 
    onFormReset, 
    onFormSubmit, 
    onFormSubmitEnd, 
    onFormSubmitFailed, 
    onFormSubmitStart, 
    onFormSubmitSuccess, 
    onFormSubmitValidateEnd, 
    onFormSubmitValidateFailed, 
    onFormSubmitValidateStart, 
    onFormSubmitValidateSuccess, 
    onFormUnmount, 
    onFormValidateEnd, 
    onFormValidateFailed, 
    onFormValidateStart, 
    onFormValidateSuccess, 
    onFormValuesChange 
} from "@formily/core";
import { attach, sleep } from "./shared";

// 表单初始化、挂载、卸载监听
test("onFormInit/OnFormMount/onFormUnmount", () => {
    const init = jest.fn();
    const mount = jest.fn();
    const unmount = jest.fn();

    const form = attach(createForm({
        effects() {
            onFormInit(init);
            onFormMount(mount);
            onFormUnmount(unmount);
        }
    }));

    expect(init).toHaveBeenCalledTimes(1);
    expect(mount).toHaveBeenCalledTimes(1);
    expect(unmount).not.toHaveBeenCalled();
    
    form.onUnmount();
    expect(unmount).toHaveBeenCalledTimes(1);
});

// 监听表单值改变、表单初始值改变
test("onFormValueChange/onFormInitialValueChange", () => {
    const initialValueChange = jest.fn();
    const valueChange = jest.fn();

    const form = attach(createForm({
        effects: () => {
            onFormInitialValuesChange(initialValueChange);
            onFormValuesChange(valueChange);
        }
    }));

    expect(initialValueChange).not.toHaveBeenCalled();
    expect(valueChange).not.toHaveBeenCalled();

    // 设置表单值
    form.setValues({ aa: "123" });
    expect(form.values.aa).toEqual("123");
    expect(initialValueChange).not.toHaveBeenCalled();
    expect(valueChange).toHaveBeenCalledTimes(1);

    // 设置表单初始值，也会修改表单值
    form.setInitialValues({ aa: "321", bb: "123" });
    expect(form.values.aa).toEqual("321");
    expect(form.values.bb).toEqual("123");

    // 没修改一个字段执行一次，所以初始值 2 次，表单值之前修改一次就是 3 次
    expect(initialValueChange).toHaveBeenCalledTimes(2);
    expect(valueChange).toHaveBeenCalledTimes(3);

    // 字段 aa 初始值没有修改，不会触发副作用，字段 bb 初始值修改，所以初始值和表单值更增加 1 次
    form.setInitialValues({ aa: "321", bb: "456" });
    expect(form.values.aa).toEqual("321");
    expect(form.values.bb).toEqual("456");
    expect(initialValueChange).toHaveBeenCalledTimes(3);
    expect(valueChange).toHaveBeenCalledTimes(4);
});

// 监听表单输入
test("onFormInputChange", () => {
    const inputChange = jest.fn();
    const valuesChange = jest.fn();

    const form = attach(createForm({
        effects: () => {
            onFormInputChange(inputChange);
            onFormValuesChange(valuesChange);
        }
    }));

    // 创建字段不会触发字段 输入和字段值改变
    const field = attach(form.createField({ name: "aa" }));
    expect(inputChange).not.toHaveBeenCalled();
    expect(valuesChange).not.toHaveBeenCalled();

    // 设置表单值不会触发输入，但会触发表单值更新
    field.setValue("123");
    expect(inputChange).not.toHaveBeenCalled();
    expect(valuesChange).toHaveBeenCalledTimes(1);

    // 输入值会触发输入，但由于输入和表单值一样，不会触发表单值更新
    field.onInput("123");
    expect(inputChange).toHaveBeenCalledTimes(1);
    expect(valuesChange).toHaveBeenCalledTimes(1);

    // 再输入一个不同的值，输入和表单值都会更新
    field.onInput("321");
    expect(inputChange).toHaveBeenCalledTimes(2);
    expect(valuesChange).toHaveBeenCalledTimes(2);
});

// 表单被动受控
test("onFormReact", () => {
    const fieldReact = jest.fn();
    const formReact = jest.fn();
    const initReact = jest.fn();
    
    const form = attach(createForm({
        effects: () => {
            // 文档中通过创建不同的 form 来证明 onFormReact 可以不传递参数
            // 这里我用 3 个 onFormReact 来说明在 effect 下可以重复监听
            onFormReact(initReact);
            onFormReact(form => {
                formReact();
                form.values.aa && fieldReact();
            });
            onFormReact();
        }
    }));

    // 表单初始化就会调用受控，fieldReact 受限于值 aa 所以没有调用
    expect(initReact).toHaveBeenCalledTimes(1);
    expect(formReact).toHaveBeenCalledTimes(1);
    expect(fieldReact).not.toHaveBeenCalled();

    form.setValues({ aa: 123 });
    expect(formReact).toHaveBeenCalledTimes(2);
    expect(fieldReact).toHaveBeenCalledTimes(1);

    // initReact 并没有因为表单值改变触发
    // 因为在 initReact 中并没有收集依赖更新的字段，所以也不会随后续更新而触发
    expect(initReact).toHaveBeenCalledTimes(1);
    form.onUnmount();
});

// 重置表单
test("onFormReset", () => {
    const reset = jest.fn();
    const form = attach(createForm({
        initialValues: {
            aa: 123,
        },
        effects() {
            onFormReset(reset);
        }
    }));

    const field = attach(form.createField({ name: "aa" }));

    field.setValue("xxxx");

    expect(field.value).toEqual("xxxx");
    expect(form.values.aa).toEqual("xxxx");
    expect(reset).not.toHaveBeenCalled();

    form.reset();
    expect(field.value).toEqual(123);
    expect(form.values.aa).toEqual(123);
    expect(reset).toHaveBeenCalledTimes(1);
});

// 表单提交
test("onFormSubmit", async () => {
    const submit = jest.fn();
    const submitStart = jest.fn();
    const submitEnd = jest.fn();
    const submitSuccess = jest.fn();
    const submitFailed = jest.fn();
    const submitValidateStart = jest.fn();
    const submitValidateFaild = jest.fn();
    const submitValidateSuccess = jest.fn();
    const submitValidateEnd = jest.fn();
    const submitting = jest.fn();

    const form = attach(createForm({
        effects: () => {
            onFormSubmitStart(submitStart);
            onFormSubmit(submit);
            onFormSubmitEnd(submitEnd);
            onFormSubmitFailed(submitFailed)
            onFormSubmitSuccess(submitSuccess);
            onFormSubmitValidateStart(submitValidateStart);
            onFormSubmitValidateFailed(submitValidateFaild);
            onFormSubmitValidateSuccess(submitValidateSuccess);
            onFormSubmitValidateEnd(submitValidateEnd);
        }
    }));

    const field = attach(form.createField({ name: "aa", required: true }));
    try {
        await form.submit(submitting);
    } catch {}

    // 验证不通过的时候表单提交除了成功和正在提交没有触发，其他都触发了
    expect(submitStart).toHaveBeenCalledTimes(1);
    expect(submit).toHaveBeenCalledTimes(1);
    expect(submitEnd).toHaveBeenCalledTimes(1);
    expect(submitFailed).toHaveBeenCalledTimes(1);

    expect(submitSuccess).not.toHaveBeenCalled();
    expect(submitting).not.toHaveBeenCalled();

    // 验证不通过除了验证成功，其他都触发了
    expect(submitValidateStart).toHaveBeenCalledTimes(1);
    expect(submitValidateFaild).toHaveBeenCalledTimes(1);
    expect(submitValidateEnd).toHaveBeenCalledTimes(1);
    expect(submitValidateSuccess).not.toHaveBeenCalled();

    // 输入一个值重新提交
    field.onInput("123");
    try {
        await form.submit(submitting);
    } catch {}

    // 只有 submitFailed 保留上次触发的 1 次，其他都 +1
    expect(submitStart).toHaveBeenCalledTimes(2);
    expect(submit).toHaveBeenCalledTimes(2);
    expect(submitEnd).toHaveBeenCalledTimes(2);
    expect(submitFailed).toHaveBeenCalledTimes(1);
    expect(submitSuccess).toHaveBeenCalledTimes(1);
    expect(submitting).toHaveBeenCalledTimes(1);

    // 只有 submitValidateFaild 保留上次触发的 1 次，其他都 +1
    expect(submitValidateStart).toHaveBeenCalledTimes(2);
    expect(submitValidateFaild).toHaveBeenCalledTimes(1);
    expect(submitValidateEnd).toHaveBeenCalledTimes(2);
    expect(submitValidateSuccess).toHaveBeenCalledTimes(1);
});

// 表单验证 - 和表单提交验证不同在于，表单验证不需要通过表单提交就可以触发
// 巩固：无论是表单提交还是表单验证，它们都是微任务
test("onFormValidate", async () => {
    const validateStart = jest.fn();
    const validateEnd = jest.fn();
    const validateFaild = jest.fn();
    const validateSuccess = jest.fn();

    const form = attach(createForm({
        effects: () => {
            onFormValidateStart(validateStart);
            onFormValidateEnd(validateEnd);
            onFormValidateFailed(validateFaild);
            onFormValidateSuccess(validateSuccess);
        }
    }));

    const field = attach(form.createField({ name: "aa", required: true }));
    try {
        await form.validate();
    } catch {}

    // 除了验证成功，其他都触发了
    expect(validateStart).toHaveBeenCalledTimes(1);
    expect(validateEnd).toHaveBeenCalledTimes(1);
    expect(validateFaild).toHaveBeenCalledTimes(1);
    expect(validateSuccess).not.toHaveBeenCalled();

    // 输入一个值再验证
    field.onInput("123");
    try {
        await form.validate();
    } catch {}

    // 除了验证失败，其他都+1
    expect(validateStart).toHaveBeenCalledTimes(2);
    expect(validateEnd).toHaveBeenCalledTimes(2);
    expect(validateFaild).toHaveBeenCalledTimes(1);
    expect(validateSuccess).toHaveBeenCalledTimes(1);
});

// 字段主动受控
test("onFieldChange", async () => {
    const fieldChange = jest.fn();
    const valueChange = jest.fn();
    const valueChange2 = jest.fn();
    const valueChange3 = jest.fn();
    const valueChange4 = jest.fn();

    const form = attach(createForm({
        effects: () => {
            // 限制生命周期
            onFieldChange("aa", [
                "disabled",
                "editable",
                "initialValue",
                "inputValue",
                "loading",
                "value",
                "visible",
            ], fieldChange);

            // 不限制生命周期
            onFieldChange("aa", valueChange);

            // @ts-ignore 生命周期为 undefined，这是一个错误设置
            onFieldChange("aa", undefined, valueChange2);

            // 也可以只传路径
            onFieldChange("aa");

            // 存在的意义是为了限制一个只有卸载才触发的回调
            onFieldChange("aa", ["unmounted"], valueChange3);

            // 存在的意义是生命周期为空的情况下，和 undefined 做比较
            onFieldChange("aa", [], valueChange4);
        }
    }));

    // 表单初始化是不会触发字段主动受控的，即便是不限生命周期
    expect(fieldChange).not.toHaveBeenCalled();
    expect(valueChange).not.toHaveBeenCalled();
    expect(valueChange2).not.toHaveBeenCalled();
    expect(valueChange3).not.toHaveBeenCalled();
    expect(valueChange4).not.toHaveBeenCalled();

    // 字段初始化会都触发一次，哪怕生命周期什么都没有也一样
    const field = attach(form.createField({ name: "aa" }));
    expect(fieldChange).toHaveBeenCalledTimes(1);
    expect(valueChange).toHaveBeenCalledTimes(1);
    expect(valueChange2).toHaveBeenCalledTimes(1);
    expect(valueChange3).toHaveBeenCalledTimes(1);
    expect(valueChange4).toHaveBeenCalledTimes(1);

    // 设置字段值
    field.setValue("123");
    expect(fieldChange).toHaveBeenCalledTimes(2);
    expect(valueChange).toHaveBeenCalledTimes(2);

    // 生命周期提供 undefined 这样的错误数据，相当于没有提供生命周期，会一直触发
    expect(valueChange2).toHaveBeenCalledTimes(2);

    // 限制字段卸载触发不受触发，以下除了卸载不再演示 valueChange3
    // 生命周期为空数组除了初始化不受触发，以下除了卸载不再演示 valueChange4
    expect(valueChange3).toHaveBeenCalledTimes(1);
    expect(valueChange4).toHaveBeenCalledTimes(1);

    // 再次修改值
    field.setValue("321");
    expect(fieldChange).toHaveBeenCalledTimes(3);
    expect(valueChange).toHaveBeenCalledTimes(3);
    expect(valueChange2).toHaveBeenCalledTimes(3);

    // 设置 loading 状态，注意了这是一个微任务，不会立即执行
    field.setLoading(true);
    expect(field.loading).toBeFalsy();

    // 停留 100 毫秒
    await sleep();
    expect(field.loading).toBeTruthy();

    // 神奇的一点是，不设置生命周期 loading，是不会去响应 loadinng 的变更
    expect(fieldChange).toHaveBeenCalledTimes(4);
    expect(valueChange).toHaveBeenCalledTimes(3);
    expect(valueChange2).toHaveBeenCalledTimes(3);

    // 同理，不设置生命周期 disabled，是不会去响应 pattern 的变更
    field.setPattern("disabled");
    expect(fieldChange).toHaveBeenCalledTimes(5);
    expect(valueChange).toHaveBeenCalledTimes(3);
    expect(valueChange2).toHaveBeenCalledTimes(3);

    // 不设置生命周期，以及包含 visible 都会响应 display
    field.setDisplay("none");
    expect(fieldChange).toHaveBeenCalledTimes(6);
    expect(valueChange).toHaveBeenCalledTimes(4);
    expect(valueChange2).toHaveBeenCalledTimes(4);

    // 表单卸载
    field.onUnmount();
    expect(valueChange3).toHaveBeenCalledTimes(2);

    // 生命周期没有 onmounted 都不会会响应
    expect(fieldChange).toHaveBeenCalledTimes(6);
    expect(valueChange).toHaveBeenCalledTimes(4);
    expect(valueChange2).toHaveBeenCalledTimes(4);

    // valueChange4 生命周期是空数组，只在字段初始化时触发
    expect(valueChange4).toHaveBeenCalledTimes(1);
});

// 字段初始化、字段挂载、字段卸载
test("onFieldInit/onFieldMount/onFieldUnmout", () => {
    const fieldInit = jest.fn();
    const fieldMount = jest.fn();
    const fieldUnmount = jest.fn();

    const form = attach(createForm({
        effects: () => {
            onFieldInit("aa", fieldInit);
            onFieldMount("aa", fieldMount);
            onFieldUnmount("aa", fieldUnmount);
        }
    }));

    // 表单初始化后字段相应的回调都不会触发
    expect(fieldInit).not.toHaveBeenCalled();
    expect(fieldMount).not.toHaveBeenCalled();
    expect(fieldUnmount).not.toHaveBeenCalled();

    // 表单初始化
    const fieldRaw = form.createField({ name: "aa" })
    expect(fieldInit).toHaveBeenCalledTimes(1);
    expect(fieldMount).not.toHaveBeenCalled();
    expect(fieldUnmount).not.toHaveBeenCalled();

    // 挂载字段
    const field = attach(fieldRaw);
    expect(fieldInit).toHaveBeenCalledTimes(1);
    expect(fieldMount).toHaveBeenCalledTimes(1);
    expect(fieldUnmount).not.toHaveBeenCalled();

    // 卸载字段
    field.onUnmount();
    expect(fieldInit).toHaveBeenCalledTimes(1);
    expect(fieldMount).toHaveBeenCalledTimes(1);
    expect(fieldUnmount).toHaveBeenCalledTimes(1);
});

// 字段初始值变更、字段值变更、字段输入值变更
test("onFieldInitialValueChange/onFieldValueChange/onFieldInputValueChange", () => {
    const fieldInitialValueChange = jest.fn();
    const fieldInputValueChange = jest.fn();
    const fieldValueChange = jest.fn();
    const notrigger = jest.fn();

    const form = attach(createForm({
        effects: () => {
            onFieldInitialValueChange("aa", fieldInitialValueChange);
            onFieldInputValueChange("aa", fieldInputValueChange);
            onFieldValueChange("aa", fieldValueChange);
            onFieldValueChange("xx", notrigger);
        }
    }));

    // 还是惯例，表单初始化并挂载并不会触发以下函数
    expect(fieldInitialValueChange).not.toHaveBeenCalled();
    expect(fieldInputValueChange).not.toHaveBeenCalled();
    expect(fieldValueChange).not.toHaveBeenCalled();
    expect(notrigger).not.toHaveBeenCalled();

    // 即便字段初始化并挂载也不会触发
    const field = attach(form.createField({ name: "aa" }));
    expect(fieldInitialValueChange).not.toHaveBeenCalled();
    expect(fieldInputValueChange).not.toHaveBeenCalled();
    expect(fieldValueChange).not.toHaveBeenCalled();

    // 设置字段值
    field.setValue("123");
    expect(fieldInitialValueChange).not.toHaveBeenCalled();
    expect(fieldInputValueChange).not.toHaveBeenCalled();
    expect(fieldValueChange).toHaveBeenCalledTimes(1);

    // 设置初始值也会设置字段值得
    field.setInitialValue("xxx");
    expect(fieldInitialValueChange).toHaveBeenCalledTimes(1);
    expect(fieldInputValueChange).not.toHaveBeenCalled();
    expect(fieldValueChange).toHaveBeenCalledTimes(2);

    // 设置输入值会覆盖 value，同理也会触发值更新
    field.onInput("321");
    expect(fieldInitialValueChange).toHaveBeenCalledTimes(1);
    expect(fieldInputValueChange).toHaveBeenCalledTimes(1);
    expect(fieldValueChange).toHaveBeenCalledTimes(3);
    expect(field.initialValue).toEqual("xxx");
    expect(field.inputValue).toEqual("321");
    expect(field.value).toEqual("321");

    // 由于字段 xx 从未创建，也不会被触发
    expect(notrigger).not.toHaveBeenCalled();
});

// 字段被动受控
test("onFieldReact", async () => {
    const react = jest.fn();
    const form = attach(createForm({
        effects: () => {
            onFieldReact("aa", field  => {
                // 只接受非虚拟字段、真实存在值，或被隐藏
                // 这条隐藏可以正确执行
                /*if (isField(field) && (field.display === "hidden" || field.value)) {
                    react();
                }*/
                // 我也不知道为什么，下面注释的条件判断只是换了个顺序，执行结果还不一样。。。
                if (isField(field) && (field.value || field.display === "hidden")) {
                    // 上面说了执行结果不一样，所以这里把参数传过去，就能够正确执行了
                    react(field.value, field.display);

                    // 这样是错误的，不知道为什么
                    // react();
                }
            });

            // @ts-ignore 容错，相当于没有设置回调
            onFieldReact("aa", null);
        }
    }));

    // 初始化是不会被触发的
    const field = attach(form.createField({ name: "aa" }));
    expect(react).not.toHaveBeenCalled();

    // 设置值
    field.setValue({ aa: 123 });
    expect(react).toHaveBeenCalledTimes(1);

    // 设置展示状态，文档显示 3 是因为文档在副作用上下文中通过 2 个不同的 if 触发回调，这里公用 1 个
    // 所以实际开发过程中也需要注意避免重复执行
    field.setDisplay("hidden");
    expect(react).toHaveBeenCalledTimes(2);
});