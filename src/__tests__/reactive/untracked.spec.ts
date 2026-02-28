import { autorun, observable, untracked } from "@formily/reactive";

// untracker 函数内部永远不会被依赖收集
test("basic untracked", () => {
  const obs = observable<{ value?: number }>({});
  const handler = jest.fn();

  autorun(() => {
    // 被 untracked 包裹后不再收集依赖
    untracked(() => handler(obs.value));
  });

  // 初始化调用 1 次
  expect(handler).toHaveBeenCalledTimes(1);

  // 修改值不会触发响应
  obs.value = 123;
  expect(handler).toHaveBeenCalledTimes(1);
});

// untracked 不提供参数什么也不会发生
test("no params untracked", () => {
  untracked();
});
