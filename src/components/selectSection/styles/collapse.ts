import { GenerateStyle, genStyleHook } from "@formily/antd-v5/lib/__builtins__";

const genCollapseStyle: GenerateStyle = token => {
  const { colorBgBase, componentCls } = token;
  return {
    [componentCls]: {
      [`&${componentCls}-borderless > ${componentCls}-item > ${componentCls}-content`]: {
        backgroundColor: colorBgBase,
        [`& > ${componentCls}-content-box`]: {
          paddingTop: 12,
        },
      },
      "&-group": {
        display: "inline",
      },
      [`${componentCls}-header-text`]: {
        [`& > .readPretty`]: {
          display: "inline",
          marginRight: 8,
        },
      },
      [`& .searchChecked`]: {
        backgroundColor: "#ff0",
      },
    },
  };
};

export default genStyleHook("Collapse", token => [genCollapseStyle(token)]);
