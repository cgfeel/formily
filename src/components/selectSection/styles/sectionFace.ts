import { genStyleHook } from "@formily/antd-v5/lib/__builtins__";

export default genStyleHook("select-face", token => {
  const {
    antCls,
    colorBgContainer,
    colorError,
    colorSuccessActive,
    colorSuccessBg,
    colorText,
    colorTextDescription,
    colorTextTertiary,
    componentCls,
  } = token;
  const borderDefaultColor = "#eaff8f";
  const height = 60;
  const width = 50;

  return {
    [componentCls]: {
      overflowX: "auto",
      [`& > ${antCls}-flex`]: {
        width: "100%",
        height,
      },
      "& > ul": {
        display: "flex",
        flexShrink: 0,
        gap: "0 12px",
        justifyItems: "flex-start",
        listStyle: "none",
        margin: 0,
        padding: 0,
        "& > li": {
          minWidth: width,
          textAlign: "center",
          height,
          [`& ${antCls}-typography`]: {
            color: colorTextTertiary,
          },
          [`${antCls}-space`]: {
            cursor: "pointer",
          },
          [`& ${antCls}-avatar`]: {
            backgroundColor: colorSuccessBg,
            border: `1px solid ${borderDefaultColor}`,
            color: colorTextDescription,
          },
          "&.checked": {
            [`& ${antCls}-typography`]: {
              color: colorText,
            },
            [`& ${antCls}-avatar`]: {
              borderColor: colorSuccessActive,
              color: colorText,
            },
            "& .face > .choices-check": {
              opacity: 1,
            },
            [`& > ${antCls}-space:hover`]: {
              "& .face > .choices-check": {
                opacity: 0,
              },
              "& .face > .choices-close": {
                opacity: 1,
              },
              [`& ${antCls}-avatar`]: {
                borderColor: colorError,
              },
            },
          },
          "& .tips-text": {
            maxWidth: width,
          },
          [`& > ${antCls}-space:hover`]: {
            "& .face .choices-check": {
              opacity: 0.5,
            },
            "& .face .choices-close": {
              opacity: 0,
            },
          },
          "& .face": {
            display: "inline-block",
            height: 32,
            position: "relative",
            width: 32,
            "& .choices": {
              borderRadius: "50%",
              bottom: -2,
              color: colorBgContainer,
              height: 14,
              lineHeight: 14,
              opacity: 0,
              position: "absolute",
              right: -3,
              textAlign: "center",
              transition: "all 200ms linear",
              width: 14,
              [`& > ${antCls}icon`]: {
                transform: "scale(0.5) translate(0, -180px)",
              },
            },
            "& .choices-check": {
              backgroundColor: colorSuccessActive,
            },
            "& .choices-close": {
              backgroundColor: colorError,
            },
          },
        },
      },
    },
  };
});
