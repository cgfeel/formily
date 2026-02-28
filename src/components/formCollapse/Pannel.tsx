import { FormButtonGroup, FormLayout, Submit } from "@formily/antd-v5";
import { FormProvider, IProviderProps } from "@formily/react";
import { Button, Card } from "antd";
import { createStyles, css } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../commonStylish";
import { IFormCollapse } from "./form-collapse";

const tabList = [
  { input: "aaa", name: "tab1", tab: "A1" },
  { input: "bbb", name: "tab2", tab: "A2" },
  { input: "ccc", name: "tab3", tab: "A3" },
] as const;

const useStyles = createStyles(css`
  width: 600px;
`);

const Pannel: FC<PropsWithChildren<PannelProps>> = ({
  children,
  footer,
  form,
  formCollapse,
  header,
}) => {
  const { styles } = useStyles();
  const stylish = useStylish();
  return (
    <div className={stylish.wraper}>
      {header}
      <div className={stylish.pannel}>
        <FormProvider form={form}>
          <Card className={styles}>
            <FormLayout labelCol={4} wrapperCol={18}>
              {children}
              <FormButtonGroup.FormItem>
                <Button
                  onClick={() =>
                    form.query(tabList[2].name).take(field => {
                      field.visible = !field.visible;
                    })
                  }
                >
                  显示/隐藏最后一个Tab
                </Button>
                <Button onClick={() => formCollapse.toggleActiveKey(tabList[1].name)}>
                  切换第二个Tab
                </Button>
                <Submit onSubmit={console.log} onSubmitFailed={console.log}>
                  提交
                </Submit>
              </FormButtonGroup.FormItem>
            </FormLayout>
          </Card>
        </FormProvider>
      </div>
      {footer}
    </div>
  );
};

export interface PannelProps extends IProviderProps {
  formCollapse: IFormCollapse;
  footer?: ReactNode;
  header?: ReactNode;
}

export { tabList };

export default Pannel;
