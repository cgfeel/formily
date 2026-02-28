import { createForm, isField, onFieldInputValueChange } from "@formily/core";
import { FC, useMemo, useState } from "react";
import Wrapper from "../fieldAction/Wrapper";
import SchemaField from "./SchemaField";
import { Alert } from "antd";

const EffectError: FC = () => {
  const [tips, setTips] = useState(false);
  const form = useMemo(
    () =>
      createForm({
        effects: () => {
          onFieldInputValueChange("input1", field => {
            field.query(".input2").take(target => {
              if (isField(target)) target.value = field.value;
            });
            try {
              // @ts-ignore
              field.doSomeErrorThing();
            } catch {
              setTips(field.value.length !== 0);
            }
          });
        },
      }),
    [setTips],
  );

  return (
    <Wrapper
      footer={
        <p>
          可能文档写的很早，目前 <code>formily</code> 生命周期响应函数中遇到未知异常会抛出来
        </p>
      }
      form={form}
      header={<h2>React.7.3: 捕获副作用里的异常</h2>}
    >
      <SchemaField>
        <SchemaField.String
          description="随便写点什么吧"
          name="input1"
          title="控制着"
          x-component="Input"
          x-decorator="FormItem"
          x-component-props={{
            allowClear: true,
          }}
        />
        <SchemaField.String
          name="input2"
          title="受控者"
          x-component="Input"
          x-decorator="FormItem"
        />
      </SchemaField>
      <Alert
        type={tips ? "error" : "warning"}
        message={tips ? "捕获到错误了，清除内容看看吧" : "等待捕获错误，随给控制者便输入什么吧"}
        icon
      />
    </Wrapper>
  );
};

export default EffectError;
