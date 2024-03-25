import { GenerateStyle, genStyleHook } from "@formily/antd-v5/lib/__builtins__";

const getFormLayoutStyle: GenerateStyle = token => {
    const { componentCls, antCls } = token;
    return {
        [componentCls]: {
            [`${antCls}-form-inline`]: {
                display: "flex",
                flexWrap: "wrap",
            },
        },
    };
};

export default genStyleHook("Form", token => [getFormLayoutStyle(token)]);
