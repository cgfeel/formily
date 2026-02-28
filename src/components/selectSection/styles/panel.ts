import { GenerateStyle, genStyleHook } from "@formily/antd-v5/lib/__builtins__";

const genCollapseStyle: GenerateStyle = token => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      width: "86%",
    },
  };
};

export default genStyleHook("panel", token => [genCollapseStyle(token)]);
