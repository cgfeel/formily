import styled from "@emotion/styled";
import { FormDialog, FormLayout } from "@formily/antd-v5";
import { Form } from "@formily/core";
import { Button } from "antd";
import { FC, ReactNode, createContext, useContext } from "react";
import useStylish from "../commonStylish";

const Context = createContext("");
const PortalId = "可以传，也可以不传的ID，默认是form-dialog";

const fieldKeys = ["a", "b", "c", "d"].map(key => key.repeat(3));
const SpanCom = styled.span`
  margin-left: 4px;
`;

const buttonClick = (field: ReactNode, initialValues?: Form["initialValues"]) => {
  const dialog = FormDialog("弹窗表单", PortalId, form => {
    const [key] = (initialValues === void 0 ? [] : Object.keys(initialValues)).concat("");
    const tips = useContext(Context);
    return (
      <FormLayout labelCol={6} wrapperCol={10}>
        <p>{tips}</p>
        {field}
        {key !== "" && (
          <FormDialog.Footer>
            <SpanCom onClick={() => dialog.close()}>
              扩展文案：{form.values[key]}(点击关闭弹窗)
            </SpanCom>
          </FormDialog.Footer>
        )}
      </FormLayout>
    );
  });
  dialog
    .forCancel((payload, next) => {
      setTimeout(() => {
        console.log(payload);
        next(payload);
      }, 1000);
    })
    .forConfirm((payload, next) => {
      setTimeout(() => {
        console.log(payload);
        next(payload);
      }, 1000);
    })
    .forOpen((payload = {}, next) => {
      setTimeout(() => {
        if (initialValues !== void 0) payload.initialValues = initialValues;
        next(payload);
      }, 1000);
    })
    .open()
    .then(console.log)
    .catch(console.log);
};

const Pannel: FC<PannelProps> = ({ footer, header, onClick }) => {
  const stylish = useStylish();
  return (
    <div className={stylish.wraper}>
      {header}
      <div className={stylish.pannel}>
        <Context.Provider value="自定义上下文可以直接传到弹窗内部，只需要ID一致即可">
          <FormDialog.Portal id={PortalId}>
            <Button onClick={onClick}>点击打开表单</Button>
          </FormDialog.Portal>
        </Context.Provider>
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

export { Context, fieldKeys, buttonClick };

export default Pannel;
