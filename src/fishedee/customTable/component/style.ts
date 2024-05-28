import { genStyleHook } from "@formily/antd-v5/lib/__builtins__";

const useStyles = genStyleHook("array-table", token => {
    const { antCls, componentCls } = token;
    return {
        [componentCls]: {
            [`${antCls}-formily-array-base-addition`]: {
                marginTop: 12,
            }
        }
    };
});

export default useStyles;