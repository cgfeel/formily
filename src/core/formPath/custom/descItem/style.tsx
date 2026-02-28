import { GenerateStyle, genStyleHook } from "@formily/antd-v5/lib/__builtins__";

const genDescItemStyle: GenerateStyle = token => {
  const { colorBgLayout, colorBorder, componentCls, fontSize, marginLG, paddingLG, paddingMD } =
    token;
  return {
    [componentCls]: {
      borderBottom: `1px solid ${colorBorder}`,
      marginBottom: marginLG,
      paddingBottom: paddingLG,
      fontSize,
      h2: {
        margin: 0,
      },
      pre: {
        margin: 0,
      },
      [`${componentCls}-extra`]: {
        [`&${componentCls}-error`]: {
          pre: {
            backgroundColor: "#fee",
          },
        },
        pre: {
          backgroundColor: colorBgLayout,
          overflowX: "auto",
          padding: paddingMD,
        },
      },
    },
  };
};

export default genStyleHook("Form", token => [genDescItemStyle(token)]);
