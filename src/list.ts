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
    "/edit-detail": {
        name: "编辑用户",
        path: lazy(() => import("./page/EditDetail")),
    },
    "/grid": {
        name: "表单网格（为查询列表准备）",
        path: lazy(() => import("./page/Grid")),
    },
    "/table": {
        name: "自增表格（查询列表）",
        path: lazy(() => import("./page/Table")),
    },
} as const;

export type RouterKey = keyof typeof router;
