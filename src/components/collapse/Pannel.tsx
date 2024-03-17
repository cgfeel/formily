import { FormButtonGroup, IFormCollapse, Submit } from "@formily/antd-v5";
import { FormProvider, IProviderProps } from "@formily/react";
import { Button } from "antd";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../commonStylish";

const tabList = [
    { input: "aaa", name: "tab1", tab: "A1" },
    { input: "bbb", name: "tab2", tab: "A2" },
    { input: "ccc", name: "tab3", tab: "A3" },
] as const;

const Pannel: FC<PropsWithChildren<PannelProps>> = ({ children, footer, form, formCollapse, header }) => {
    const stylish = useStylish();
    return (
        <div className={stylish.wraper}>
            {header}
            <div className={stylish.pannel}>
                <FormProvider form={form}>
                    {children}
                    <FormButtonGroup.FormItem>
                        <Button
                            onClick={() =>
                                form.query(tabList[2].name).take(field => {
                                    field.visible = !field.visible;
                                })
                            }>
                            显示/隐藏最后一个Tab
                        </Button>
                        <Button onClick={() => formCollapse.setActiveKeys(tabList[1].name)}>切换第二个Tab</Button>
                        <Submit onSubmit={console.log} onSubmitFailed={console.log}>
                            提交
                        </Submit>
                    </FormButtonGroup.FormItem>
                </FormProvider>
            </div>
            {footer}
        </div>
    );
};

declare module "@formily/antd-v5" {
    export interface IFormCollapseProps extends FormCollapse {}
}

export interface FormCollapse extends Omit<IFormCollapse, "activeKeys"> {
    activeKeys: IFormCollapse["activeKeys"] | undefined;
}

export interface PannelProps extends IProviderProps {
    formCollapse: FormCollapse;
    footer?: ReactNode;
    header?: ReactNode;
}

export { tabList };

export default Pannel;
