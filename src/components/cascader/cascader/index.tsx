import { LoadingOutlined } from "@ant-design/icons";
import { PreviewText } from "@formily/antd-v5";
import { connect, mapProps, mapReadPretty } from "@formily/react";
import { Cascader as AntdCascader } from "antd";

export const Cascader = connect(
    AntdCascader,
    mapProps(
        {
            dataSource: "options",
        },
        (props, field) => {
            const loading = ("loading" in field && field.loading) || ("validating" in field && field.validating);
            return {
                ...props,
                suffixIcon: loading ? <LoadingOutlined /> : props.suffixIcon,
            };
        },
    ),
    mapReadPretty(PreviewText.Cascader),
);

export default Cascader;
