import { createForm, isField } from "@formily/core";
import { attach } from "./shared";

// 获取表单模型，设置表单模型
test("getGraph/setGraph", () => {
  const form = attach(createForm());
  attach(form.createField({ name: "normal" }));
  attach(form.createArrayField({ name: "array" }));
  attach(form.createObjectField({ name: "object" }));
  attach(form.createVoidField({ name: "void" }));

  form.query("normal").take(field => {
    if (isField(field)) field.selfErrors = ["error"];
  });

  const graph = form.getFormGraph();
  form.clearFormGraph();
  form.setFormGraph(graph);

  const graph2 = form.getFormGraph();
  expect(graph).toEqual(graph2);

  form.setFormGraph({
    object: {
      value: { input: 123 },
    },
  });
  expect(form.getFieldState("normal", state => state.selfErrors)).toEqual(["error"]);
  expect(form.values.object).toEqual({ input: 123 });
});

// 回收表单、字段模型
test("clearFormGraph", () => {
  const form = attach(createForm());
  attach(form.createField({ name: "normal" }));
  attach(form.createArrayField({ name: "array" }));
  attach(form.createObjectField({ name: "object" }));

  form.clearFormGraph("normal");
  expect(form.fields.normal).toBeUndefined();
  expect(form.fields.array).toBeDefined();
});
