import { GenerateStyle, genStyleHook } from "@formily/antd-v5/lib/__builtins__";

const genSectionStyle: GenerateStyle = token => {
  const {
    antCls,
    borderRadiusLG,
    colorBorderSecondary,
    componentCls,
    lineType,
    lineWidth,
    paddingSM,
  } = token;
  return {
    [componentCls]: {
      [`${antCls}-card ${antCls}-card-body`]: {
        padding: 0,
      },
      [`${antCls}-card ${antCls}-card-head`]: {
        minHeight: "auto",
        padding: 0,
      },
      [`${antCls}-card-topbar`]: {
        borderBottom: `${lineWidth}px ${lineType} ${colorBorderSecondary}`,
        padding: paddingSM,
      },
      [`${antCls}-section-collapse-item`]: {
        borderTop: `${lineWidth}px ${lineType} ${colorBorderSecondary}`,
      },
      ".row-border": {
        border: `${lineWidth}px ${lineType} ${colorBorderSecondary}`,
        borderRadius: `${borderRadiusLG}px`,
        [`& > ${antCls}-col + ${antCls}-col`]: {
          "&::before": {
            backgroundColor: `${colorBorderSecondary}`,
            bottom: 0,
            content: "''",
            left: 0,
            position: "absolute",
            top: 0,
            width: "1px",
            zIndex: 1,
          },
        },
      },
    },
  };
};

export default genStyleHook("section", token => [genSectionStyle(token)]);
