import { createForm } from "@formily/core";
import { ISchema } from "@formily/json-schema";
import { FC } from "react";
import SchemaField from "../SchemaField";
import FormCom from "./FormCom";

const form = createForm({
    validateFirst: true,
});

const phoneSchema: ISchema = {
    type: "object",
    properties: {
        phone: {
            required: true,
            title: "手机号",
            type: "string",
            "x-component": "Input",
            "x-decorator": "FormItem",
            "x-validator": "phone",
            "x-component-props": {
                prefix: "{{icon('phone')}}",
            },
        },
        verifyCode: {
            required: true,
            title: "验证码",
            type: "string",
            "x-component": "VerifyCode",
            "x-decorator": "FormItem",
            "x-component-props": {
                prefix: "{{icon('pwd')}}",
            },
            "x-reactions": [
                {
                    dependencies: [".phone#value", ".phone#valid"],
                    fulfill: {
                        state: {
                            "component[1].phoneNumber": "{{$deps[0]}}",
                            "component[1].readyPost": "{{$deps[0] && $deps[1]}}",
                        },
                    },
                },
            ],
        },
    },
};

const PhoneJson: FC = () => (
    <FormCom form={form}>
        <SchemaField schema={phoneSchema} />
    </FormCom>
);

export default PhoneJson;
