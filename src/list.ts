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
    "/dialog-drawer": {
        name: "弹窗与抽屉",
        path: lazy(() => import("./page/DialogDrawer")),
    },
    "/step-form": {
        name: "分步表单",
        path: lazy(() => import("./page/StepForm")),
    },
    "/tab-collapse": {
        name: "选项卡、折叠表单",
        path: lazy(() => import("./page/TabCollapse")),
    },
    "/validate": {
        name: "表单校验",
        path: lazy(() => import("./page/Validate")),
    },
    "/layout": {
        name: "实现表单布局",
        path: lazy(() => import("./page/Layout")),
    },
    "/async": {
        name: "实现异步数据源（含同步组件示例）",
        path: lazy(() => import("./page/AsyncCom")),
    },
    "/controlled": {
        name: "实现表单受控",
        path: lazy(() => import("./page/Controlled")),
    },
    "/linkage": {
        name: "实现联动逻辑",
        path: lazy(() => import("./page/LinkAges")),
    },
    "/calculator": {
        name: "实现联动计算器",
        path: lazy(() => import("./page/Calculator")),
    },
    "/custom": {
        name: "实现自定义组件",
        path: lazy(() => import("./page/Custom")),
    },
    "/destructor": {
        name: "前后端数据差异兼容方案",
        path: lazy(() => import("./page/Destructor")),
    },
    "/reactive": {
        name: "Reactive Library",
        path: lazy(() => import("./page/Reactive")),
    },
} as const;

export type RouterKey = keyof typeof router;
