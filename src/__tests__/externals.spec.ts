import {
  Field,
  Form,
  createEffectHook,
  createForm,
  isArrayField,
  isArrayFieldState,
  isDataField,
  isDataFieldState,
  isField,
  isFieldState,
  isForm,
  isFormState,
  isGeneralField,
  isGeneralFieldState,
  isObjectField,
  isObjectFieldState,
  isQuery,
  isVoidField,
  isVoidFieldState,
} from "@formily/core";
import { attach } from "./shared";

// 检查类型
test("type checkers", () => {
  const form = attach(createForm());
  const normal = attach(form.createField({ name: "normal" }));
  const array = attach(form.createArrayField({ name: "array" }));
  const object = attach(form.createObjectField({ name: "object" }));
  const void_ = attach(form.createVoidField({ name: "void" }));

  expect(isField(normal)).toBeTruthy();
  expect(isFieldState(normal.getState())).toBeTruthy();
  expect(isFieldState(null)).toBeFalsy();
  expect(isFieldState({})).toBeFalsy();
  expect(isFieldState(normal)).toBeFalsy();

  expect(isArrayField(array)).toBeTruthy();
  expect(isArrayFieldState(array.getState())).toBeTruthy();
  expect(isArrayFieldState(null)).toBeFalsy();
  expect(isArrayFieldState({})).toBeFalsy();
  expect(isArrayFieldState(array)).toBeFalsy();

  expect(isObjectField(object)).toBeTruthy();
  expect(isObjectFieldState(object.getState())).toBeTruthy();
  expect(isObjectFieldState(null)).toBeFalsy();
  expect(isObjectFieldState({})).toBeFalsy();
  expect(isObjectFieldState(object)).toBeFalsy();

  expect(isVoidField(void_)).toBeTruthy();
  expect(isVoidFieldState(void_.getState())).toBeTruthy();
  expect(isVoidFieldState(null)).toBeFalsy();
  expect(isVoidFieldState({})).toBeFalsy();
  expect(isVoidFieldState(void_)).toBeFalsy();

  expect(isDataField(void_)).toBeFalsy();
  expect(isDataFieldState(void_.getState())).toBeFalsy();

  expect(isDataField(normal)).toBeTruthy();
  expect(isDataFieldState(normal.getState())).toBeTruthy();
  expect(isGeneralField(normal)).toBeTruthy();
  expect(isGeneralField(array)).toBeTruthy();
  expect(isGeneralField(object)).toBeTruthy();
  expect(isGeneralField(void_)).toBeTruthy();

  expect(isGeneralFieldState(normal.getState())).toBeTruthy();
  expect(isGeneralFieldState(array.getState())).toBeTruthy();
  expect(isGeneralFieldState(object.getState())).toBeTruthy();
  expect(isGeneralFieldState(void_.getState())).toBeTruthy();
  expect(isGeneralFieldState(null)).toBeFalsy();
  expect(isGeneralFieldState({})).toBeFalsy();
  expect(isGeneralFieldState(void_)).toBeFalsy();

  expect(isForm(form)).toBeTruthy();
  expect(isFormState(form.getState())).toBeTruthy();
  expect(isFormState(null)).toBeFalsy();
  expect(isFormState({})).toBeFalsy();
  expect(isFormState(form)).toBeFalsy();
  expect(isQuery(form.query("*"))).toBeTruthy();
});

// 自定义 effect
test("createEffectHook", () => {
  const info: { results: EffectItem[]; error?: Error } = {
    results: [],
  };

  try {
    // 只能在 form 的 effect 中使用
    createEffectHook("xxx")();
  } catch (e) {
    if (e instanceof Error) info.error = e;
  }

  const form = attach(
    createForm({
      effects: () => {
        createEffectHook("xxxa")();
        createEffectHook("yyyb", (payload, ctx) => (name: string, age: number) => {
          info.results.push({ name, age, payload, ctx });
        })("name-yy", 18);
      },
    }),
  );

  const field = attach(form.createField({ name: "input" }));

  form.notify("xxxa");
  form.notify("yyyb");
  form.notify("yyyb", field);

  // @ts-ignore eslint 过不去，但方法存在
  field.notify("yyyb");

  expect(info.error).toBeDefined();
  expect(info.results.length).toBe(3);

  info.results.forEach(({ name, age, payload, ctx }, i) => {
    expect(name).toEqual("name-yy");
    expect(age).toBe(18);

    // form 和 field 触发 notify 时不提供 payload，会将自身传过去
    expect(i === 0 ? isForm(payload) : isField(payload)).toBeTruthy();
    expect(isForm(ctx)).toBeTruthy();
  });
});

interface EffectItem {
  name: string;
  age: number;
  payload: Form | Field;
  ctx: Form;
}
