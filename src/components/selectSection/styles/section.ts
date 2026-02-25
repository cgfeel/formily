import { GenerateStyle, genStyleHook } from "@formily/antd-v5/lib/__builtins__";

const genSectionStyle: GenerateStyle = token => {
  const {
    antCls,
    borderRadiusLG,
    colorBorderSecondary,
    colorText,
    colorTextQuaternary,
    componentCls,
    fontSize,
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
        padding: `10px ${paddingSM}px`,
        fontSize,
      },
      [`${antCls}-card-topbar`]: {
        borderBottom: `${lineWidth}px ${lineType} ${colorBorderSecondary}`,
        padding: paddingSM,
      },
      [`${antCls}-input-suffix`]: {
        color: colorTextQuaternary,
      },
      [`${antCls}-section-collapse-item`]: {
        borderTop: `${lineWidth}px ${lineType} ${colorBorderSecondary}`,
      },
      [`${antCls}-skeleton`]: {
        width: "100%",
        [`${antCls}-skeleton-input`]: {
          width: "100%",
        },
      },
      ".group-item": {
        position: "relative",
        ".remove-item": {
          padding: 0,
          position: "absolute",
          right: 0,
          top: 0,
        },
      },
      ".remove-item": {
        color: colorText,
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
      ".sort-handle": {
        cursor: "all-scroll",
      },
    },
  };
};

export default genStyleHook("section", token => [genSectionStyle(token)]);
