import { lazy } from "react";

const registerList = {
    "/set-validate-language-enus": {
        name: "设置英语",
        path: lazy(() => import("./components/SetValidateLanguageEnUs")),
    },
    "/set-validate-language-zhcn": {
        name: "设置中文",
        path: lazy(() => import("./components/SetValidateLanguageZhCn")),
    },
    "/register-validate-formate": {
        name: "校验格式",
        path: lazy(() => import("./components/RegisterValidateFormate")),
    },
    "/register-validate-locale": {
        name: "日语定制",
        path: lazy(() => import("./components/RegisterValidateLocale")),
    },
    "/register-validate-custom": {
        name: "定制提示",
        path: lazy(() => import("./components/RegisterValidateCustom")),
    },
    "/register-validate-message-template-enigne": {
        name: "定制模板",
        path: lazy(() => import("./components/RegisterValidateMessageTemplateEnigne")),
    },
    "/register-validate-rules": {
        name: "校验规则",
        path: lazy(() => import("./components/RegisterValidateRules")),
    },
    "/get-validate-locale-ios-code": {
        name: "ISO Code",
        path: lazy(() => import("./components/GetValidateLocaleIOSCode")),
    },
};

export default registerList;
