import { lazy } from "react";

export const router = {
    "/": {
        name: "索引页",
        path: lazy(() => import("./page/List")),
    },
    "/app": {
        name: "默认页",
        path: lazy(() => import("./page/app/App")),
    },
    "/start": {
        name: "快速开始",
        path: lazy(() => import("./page/Start")),
    },
    "/login": {
        name: "登录注册",
        path: lazy(() => import("./page/LoginRegister")),
    },
} as const;

export type RouterKey = keyof typeof router;
