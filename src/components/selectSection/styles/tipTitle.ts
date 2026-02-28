import { GenerateStyle, genStyleHook } from "@formily/antd-v5/lib/__builtins__";

const genTipTitle: GenerateStyle = token => {
  const { componentCls, marginSM, paddingSM } = token;
  return {
    [componentCls]: {
      padding: paddingSM,
      [`& + ${componentCls}`]: {
        paddingTop: 0,
      },
      ".secondary-title": {
        marginBottom: marginSM,
      },
    },
  };
};

export default genStyleHook("tip-title", token => [genTipTitle(token)]);
