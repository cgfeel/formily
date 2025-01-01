import { ContainerOutlined, DatabaseOutlined } from "@ant-design/icons";
import { isField } from "@formily/core";
import { observer, useField } from "@formily/react";
import { Button, Checkbox, CheckboxProps, Flex } from "antd";
import { FC, PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";

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

const ToolBar: FC<PropsWithChildren<ToolBarProps>> = ({ children, onExpand, expand = true }) => {
    const field = useField();
    const { total = 0 } = field.data || {};
    const disabled = total === 0;

    return (
        <Flex justify="space-between">
            <div>{children}</div>
            <Button disabled={disabled} size="small" type="link" onClick={() => onExpand && onExpand(expand)}>
                {disabled || expand ? (
                    <>
                        <ContainerOutlined /> 展开
                    </>
                ) : (
                    <>
                        <DatabaseOutlined /> 收起
                    </>
                )}
            </Button>
        </Flex>
    );
};

const CheckedAll = Object.assign(observer(InternalCheckedAll), {
    ToolBar: observer(ToolBar),
});

export default CheckedAll;

interface ToolBarProps {
    expand?: boolean;
    onExpand?: (show: boolean) => void;
}
