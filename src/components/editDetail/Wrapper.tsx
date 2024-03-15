import { PreviewText, Submit } from "@formily/antd-v5";
import { FormConsumer } from "@formily/react";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Button, Space, Spin } from "antd";
import Pannel, { PannelProps } from "../register/components/Pannel";

const prevText = (editable?: boolean) => (editable ? "预 览" : "编 辑");
const initData = {
    username: "Levi",
    firstName: "Vi",
    lastName: "Lee",
    email: "cgfeel@gmail.com",
    gender: 1,
    birthday: "3056-11-05",
    address: ["310000", "310000", "310101"],
    idCard: [
        {
            name: "this is image",
            thumbUrl: "/logo512.png",
            uid: "rc-upload-1615825692847-2",
            url: "/logo512.png",
        },
    ],
    contacts: [
        { name: "张三", phone: "13245633378", email: "zhangsan@gmail.com" },
        { name: "李四", phone: "16873452678", email: "lisi@gmail.com" },
    ],
};

const Wrapper: FC<PropsWithChildren<WrapperProps>> = ({ children, form, ...props }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            form && form.setInitialValues(initData);
            setLoading(false);
        }, 1000);
    }, [form, setLoading]);

    return (
        <PreviewText.Placeholder value="-">
            <Pannel
                {...props}
                title="编辑用户"
                form={form}
                submit={
                    <Space>
                        <FormConsumer>
                            {form => (
                                <Submit size="large" disabled={!form.editable}>
                                    提交
                                </Submit>
                            )}
                        </FormConsumer>
                        <Button
                            size="large"
                            onClick={event =>
                                form?.setState(state => {
                                    state.editable = !state.editable;
                                    if ("innerText" in event.target) {
                                        event.target.innerText = prevText(state.editable);
                                    }
                                })
                            }>
                            {prevText(form?.editable)}
                        </Button>
                    </Space>
                }>
                <Spin spinning={loading}>{children}</Spin>
            </Pannel>
        </PreviewText.Placeholder>
    );
};

export interface WrapperProps extends Omit<PannelProps, "submit" | "title"> {}

export default Wrapper;
