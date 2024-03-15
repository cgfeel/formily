import { createForm } from "@formily/core";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import Pannel, { PannelProps } from "../register/components/Pannel";
import { Spin } from "antd";

const form = createForm({
    validateFirst: true,
});

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

const Wrapper: FC<PropsWithChildren<WrapperProps>> = ({ children, header }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            form.setInitialValues(initData);
            setLoading(false);
        }, 1000);
    }, [setLoading]);

    return (
        <Pannel submit="提交" title="编辑用户" form={form} header={header}>
            <Spin spinning={loading}>{children}</Spin>
        </Pannel>
    );
};

export interface WrapperProps extends Pick<PannelProps, "footer" | "header"> {}

export default Wrapper;
