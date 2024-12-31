import { isField } from "@formily/core";
import { observer, useField } from "@formily/react";
import { Button, Checkbox, CheckboxProps, Flex } from "antd";
import { FC, PropsWithChildren } from "react";

const InternalCheckedAll: FC<Omit<CheckboxProps, "checked" | "indeterminate" | "onChange">> = props => {
    const field = useField();
    const { checked = 0, total = 0 } = field.data || {};

    return (
        <Checkbox
            {...props}
            checked={total > 0 && checked === total}
            disabled={total === 0 || props.disabled}
            indeterminate={checked > 0 && checked < total}
            onChange={({ target }) => isField(field) && field.setValue(target.checked)}>
            {checked}
            {"/"}
            {total}
        </Checkbox>
    );
};

const ToolBar: FC<PropsWithChildren<ToolBarProps>> = ({ children, onExpand }) => {
    return (
        <Flex justify="space-between">
            <div>{children}</div>
            <Button></Button>
        </Flex>
    );
};

const CheckedAll = Object.assign(observer(InternalCheckedAll), {
    ToolBar,
});

export default CheckedAll;

interface ToolBarProps {
    onExpand: (show: boolean) => void;
}
