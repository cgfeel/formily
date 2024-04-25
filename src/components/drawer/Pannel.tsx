import { FormButtonGroup, FormLayout, Reset, Submit } from "@formily/antd-v5";
import { Form } from "@formily/core";
import { Button } from "antd";
import { FC, ReactNode } from "react";
import useStylish from "../commonStylish";
import FormDrawer from "./form-drawer";

const fieldKeys = ["a", "b", "c", "d"].map(key => key.repeat(3));
const PortalId = "可以传，也可以不传的ID，默认是form-drawer";

const buttonClick = (field: ReactNode, initialValues?: Form["initialValues"], result?: (val: string[]) => void) => {
    const drawer = FormDrawer("抽屉表单", form => {
        const [key] = (initialValues === void 0 ? [] : Object.keys(initialValues)).concat("");
        return (
            <FormLayout labelCol={6} wrapperCol={10}>
                {field}
                {key !== "" && <p onClick={() => drawer.close()}>扩展文案：{form.values[key]}(点击关闭弹窗)</p>}
                <FormDrawer.Extra>
                    <FormButtonGroup align="right">
                        <Submit
                            onSubmit={() => {
                                return new Promise(resolve => {
                                    setTimeout(resolve, 1000);
                                });
                            }}
                            onSubmitFailed={console.log}>
                            提交
                        </Submit>
                        <Reset>重置</Reset>
                    </FormButtonGroup>
                </FormDrawer.Extra>
            </FormLayout>
        );
    });
    drawer
        .forOpen((_, next) => {
            // 从这个例子可以看出来，这里的中间件只负责是否阻拦打开，并没有阻断 open 时初始化的数据
            setTimeout(() => {
                next();
            }, 1000);
        })
        .open(initialValues === void 0 ? initialValues : { initialValues })
        .then(result || console.log);
};

const Pannel: FC<PannelProps> = ({ footer, header, onClick }) => {
    const stylish = useStylish();
    return (
        <div className={stylish.wraper}>
            {header}
            <div className={stylish.pannel}>
                <FormDrawer.Portal id={PortalId}>
                    <Button onClick={onClick}>点击打开表单</Button>
                </FormDrawer.Portal>
            </div>
            {footer}
        </div>
    );
};

export interface PannelProps {
    footer?: ReactNode;
    header?: ReactNode;
    onClick?: () => void;
}

export { fieldKeys, buttonClick };

export default Pannel;
