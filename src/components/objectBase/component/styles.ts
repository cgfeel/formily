import { genStyleHook } from "@formily/antd-v5/lib/__builtins__";

const useStyle = genStyleHook('', token => {
    const { antCls, componentCls } = token;
    return {
        [`${componentCls}-item`]: {
            [`${antCls}-col:last-child`]: {
                "& > div": {
                    paddingLeft: 20,
                    position: "relative",
                    "&::after": {
                        backgroundColor: "#ddd",
                        content: '""',
                        height: "100%",
                        left: 0,
                        position: "absolute",
                        top: 20,
                        width: 1,
                    },
                    "&::before": {
                        backgroundColor: "#ddd",
                        content: '""',
                        height: 1,
                        left: 0,
                        position: "absolute",
                        top: 20,
                        width: 20,
                    },
                    "&:last-child::after": {
                        display: "none"
                    },
                },
                [`& > ${antCls}-formily-item::before`]: {
                    left: -4,
                }
            },
            [`${componentCls}-item`]: {
                left: -4,
            }
        }
    };
});

export default useStyle;