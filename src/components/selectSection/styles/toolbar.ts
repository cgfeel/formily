import { GenerateStyle, genStyleHook } from "@formily/antd-v5/lib/__builtins__";

const genToolbarStyle: GenerateStyle = token => {
  const {
    antCls,
    colorBorderSecondary,
    colorFillQuaternary,
    componentCls,
    lineType,
    lineWidth,
    paddingSM,
    paddingXXS,
  } = token;

  return {
    [componentCls]: {
      backgroundColor: colorFillQuaternary,
      borderBottom: `${lineWidth}px ${lineType} ${colorBorderSecondary}`,
      padding: `${paddingXXS}px ${paddingSM}px`,
      [`${antCls}-checkbox-wrapper`]: {
        alignItems: "center",
      },
      [`${antCls}-select-outlined:not(${antCls}-select-customize-input) ${antCls}-select-selector`]:
        {
          border: "none",
        },
      [`${antCls}-select:where(:not(${antCls}-select-single${antCls}-select-open, ${antCls}-select-outlined${antCls}-select-disabled)) ${antCls}-select-arrow`]:
        {
          color: "rgba(0, 0, 0, .88)",
        },
      [`${antCls}-select-focused${antCls}-select-outlined:not(${antCls}-select-disabled):not(${antCls}-select-customize-input):not(${antCls}-pagination-size-changer) ${antCls}-select-selector`]:
        {
          boxShadow: "none",
        },
      [`${antCls}-select-outlined${antCls}-select-disabled:not(${antCls}-select-customize-input) ${antCls}-select-selector`]:
        {
          backgroundColor: "transparent",
        },
    },
  };
};

export default genStyleHook("toolbar", token => [genToolbarStyle(token)]);
