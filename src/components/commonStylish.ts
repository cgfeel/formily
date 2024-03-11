import { createStylish } from "antd-style";

const useStylish = createStylish(({ token }) => ({
    pannel: {
        alignItems: 'center',
        backgroundColor: "#eee",
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        overflowX: 'auto',
        padding: "40px 0",
    },
    wraper: {
        marginBottom: 100,
        code: {
            backgroundColor: token.colorBgLayout,
            border: "1px solid " + token.colorBorder,
            padding: 4,
            margin: "0 2px",
        },
    },
}));

export default useStylish;
