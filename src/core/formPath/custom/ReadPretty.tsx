import styled from "@emotion/styled";
import { Input } from "@formily/antd-v5";
import { connect, mapProps } from "@formily/react";

const InputRead = styled(Input)`
  &.ant-input-disabled,
  &.ant-input-disabled:hover:not([disabled]) {
    background-color: transparent;
    border-color: transparent;
    color: #000;
  }
  & > input {
    font-weight: 600;
  }
`;

const ReadPretty = connect(
  InputRead,
  mapProps(props => ({
    ...props,
    disabled: true,
  })),
);

export default ReadPretty;
