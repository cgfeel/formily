import { connect, mapReadPretty } from "@formily/react";
import { Input as AntdInput } from "antd";

const Input = connect(
    AntdInput,
    mapReadPretty(({ value }) => <div>{value}</div>),
);

export default Input;
