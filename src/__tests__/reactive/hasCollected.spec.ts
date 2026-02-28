import { autorun, hasCollected, observable } from "@formily/reactive";

// 检测某段执行逻辑是否存在依赖收集
test("hasCollected", () => {
  const obs = observable({ value: "" });
  autorun(() => {
    // 在 autorun 中会自动收集依赖
    expect(
      hasCollected(() => {
        void obs.value;
      }),
    ).toBeTruthy();

    // 在 autorun 中不提供劫持对象，无法正常收集
    expect(hasCollected(() => {})).toBeFalsy();
    expect(hasCollected()).toBeFalsy();
  });

  // 在 autorun 外部不能自动收集依赖
  expect(
    hasCollected(() => {
      void obs.value;
    }),
  ).toBeFalsy();
  expect(hasCollected(() => {})).toBeFalsy();
  expect(hasCollected()).toBeFalsy();
});
