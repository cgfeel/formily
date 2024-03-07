import { createForm } from "@formily/core";
import { FC } from "react";
import SchemaField from "../SchemaField";
import FormCom from "./FormCom";

const phoneForm = createForm({
    validateFirst: true,
});

const PhoneMarkup: FC = () => (
    <FormCom form={phoneForm}>
        <SchemaField>
            <SchemaField.String
                name="phone"
                title="手机号"
                x-component="Input"
                x-component-props={{
                    prefix: "{{icon('phone')}}",
                }}
                x-decorator="FormItem"
                x-validator="phone"
                required
            />
            {/**
             * reactions - 关联反应
             *  - 这里采用`dependencies`被动受控，主动受控用`target`
             *  - 可以采用单个对象决定关联反应，也可以创建数组用于一组反应条件
             * ----
             * 用法：
             *  - dependencies: 依赖的数组项，这里采用：.{路径}#动作，暂可看做`React`中`useEffect`中第二个依赖数组参数
             *  - fulfill: 满足条件做出的反应
             *    - state: 更新组件状态
             *      - component: 当前模型中所有的组件，可按照路径调用
             *      - deps: 依赖项，根据`dependencies`中索引获取值，由于是在作用域中调用，所以前面加上`$`表示是一个变量
             */}
            <SchemaField.String
                name="verifyCode"
                title="验证码"
                x-component="VerifyCode"
                x-component-props={{
                    prefix: "{{icon('pwd')}}",
                }}
                x-decorator="FormItem"
                x-reactions={[
                    {
                        dependencies: [".phone#value", ".phone#valid"],
                        fulfill: {
                            state: {
                                "component[1].phoneNumber": "{{$deps[0]}}",
                                "component[1].readyPost": "{{$deps[0] && $deps[1]}}",
                            },
                        },
                    },
                ]}
                required
            />
        </SchemaField>
    </FormCom>
);

export default PhoneMarkup;
