import { isField } from "@formily/core";
import { observer, useField } from "@formily/react";
import { Form } from "antd";
import { FC, PropsWithChildren } from "react";

const FormItem: FC<PropsWithChildren> = ({ children }) => {
    const field = useField();
    return isField(field) ? (
        <Form.Item
            extra={field.description}
            help={field.selfErrors.length ? field.selfErrors : undefined}
            label={field.title}
            validateStatus={field.validateStatus}>
            {children}
        </Form.Item>
    ) : (
        <>{children}</>
    );
};

export default observer(FormItem);
