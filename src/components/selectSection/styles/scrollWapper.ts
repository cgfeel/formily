import { GenerateStyle, genStyleHook } from "@formily/antd-v5/lib/__builtins__";

const genScrollWapper: GenerateStyle = token => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      maxHeight: "attr(data-min-height px, 400px)",
      overflow: "auto",
    },
  };
};

export default genStyleHook("scroll-wapper", token => [genScrollWapper(token)]);
