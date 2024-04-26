import { connect, mapReadPretty } from "@formily/react";
import { Input as InputRaw } from "antd";

const Input = connect(
    InputRaw,
    mapReadPretty(({ value }) => <div>{value}</div>),
);

export default Input;
