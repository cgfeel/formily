import { LoadingOutlined } from "@ant-design/icons";
import { createRouteComponentBindLoading } from "./helper/factory";

const createRouteComponent = createRouteComponentBindLoading(<LoadingOutlined />);

const pathList: PathItem[] = [
  {
    hidden: true,
    name: "设置英语",
    path: createRouteComponent(
      () => import("@/core/formValidatorRegistry/components/SetValidateLanguageEnUs"),
    ),
    url: "/set-validate-language-enus",
  },
  {
    hidden: true,
    name: "设置中文",
    path: createRouteComponent(
      () => import("@/core/formValidatorRegistry/components/SetValidateLanguageZhCn"),
    ),
    url: "/set-validate-language-zhcn",
  },
  {
    hidden: true,
    name: "校验格式",
    path: createRouteComponent(
      () => import("@/core/formValidatorRegistry/components/RegisterValidateFormate"),
    ),
    url: "/register-validate-formate",
  },
  {
    hidden: true,
    name: "日语定制",
    path: createRouteComponent(
      () => import("@/core/formValidatorRegistry/components/RegisterValidateLocale"),
    ),
    url: "/register-validate-locale",
  },
  {
    hidden: true,
    name: "定制提示",
    path: createRouteComponent(
      () => import("@/core/formValidatorRegistry/components/RegisterValidateCustom"),
    ),
    url: "/register-validate-custom",
  },
  {
    hidden: true,
    name: "定制模板",
    path: createRouteComponent(
      () => import("@/core/formValidatorRegistry/components/RegisterValidateMessageTemplateEnigne"),
    ),
    url: "/register-validate-message-template-enigne",
  },
  {
    hidden: true,
    name: "校验规则",
    path: createRouteComponent(
      () => import("@/core/formValidatorRegistry/components/RegisterValidateRules"),
    ),
    url: "/register-validate-rules",
  },
  {
    hidden: true,
    name: "ISO Code",
    path: createRouteComponent(
      () => import("@/core/formValidatorRegistry/components/GetValidateLocaleIOSCode"),
    ),
    url: "/get-validate-locale-ios-code",
  },
  {
    hidden: true,
    name: "索引页",
    path: createRouteComponent(() => import("@/page/List")),
    url: "/",
  },
  {
    name: "默认页",
    path: createRouteComponent(() => import("@/page/app/App")),
    url: "/app",
  },
  {
    name: "快速开始",
    path: createRouteComponent(() => import("@/page/Start")),
    url: "/start",
  },
  {
    name: "登录注册",
    path: createRouteComponent(() => import("@/page/LoginRegister")),
    url: "/login",
  },
  {
    name: "编辑用户",
    path: createRouteComponent(() => import("@/page/EditDetail")),
    url: "/edit-detail",
  },
  {
    name: "表单网格（为查询列表准备）",
    path: createRouteComponent(() => import("@/page/Grid")),
    url: "/grid",
  },
  {
    name: "自增表格（查询列表）",
    path: createRouteComponent(() => import("@/page/Table")),
    url: "/table",
  },
  {
    name: "弹窗与抽屉",
    path: createRouteComponent(() => import("@/page/DialogDrawer")),
    url: "/dialog-drawer",
  },
  {
    name: "分步表单",
    path: createRouteComponent(() => import("@/page/StepForm")),
    url: "/step-form",
  },
  {
    name: "选项卡、折叠表单",
    path: createRouteComponent(() => import("@/page/TabCollapse")),
    url: "/tab-collapse",
  },
  {
    name: "表单校验",
    path: createRouteComponent(() => import("@/page/Validate")),
    url: "/validate",
  },
  {
    name: "实现表单布局",
    path: createRouteComponent(() => import("@/page/Layout")),
    url: "/layout",
  },
  {
    name: "实现异步数据源（含同步组件示例）",
    path: createRouteComponent(() => import("@/page/AsyncCom")),
    url: "/async",
  },
  {
    name: "实现表单受控",
    path: createRouteComponent(() => import("@/page/Controlled")),
    url: "/controlled",
  },
  {
    name: "实现联动逻辑",
    path: createRouteComponent(() => import("@/page/LinkAges")),
    url: "/linkage",
  },
  {
    name: "实现联动计算器",
    path: createRouteComponent(() => import("@/page/Calculator")),
    url: "/calculator",
  },
  {
    name: "实现自定义组件",
    path: createRouteComponent(() => import("@/page/Custom")),
    url: "/custom",
  },
  {
    name: "前后端数据差异兼容方案",
    path: createRouteComponent(() => import("@/page/Destructor")),
    url: "/destructor",
  },
  {
    name: "Reactive Library",
    path: createRouteComponent(() => import("@/page/Reactive")),
    url: "/reactive",
  },
  {
    name: "Core Library",
    path: createRouteComponent(() => import("@/page/Core")),
    url: "/core",
  },
  {
    name: "React Library",
    path: createRouteComponent(() => import("@/page/ReactLibrary")),
    url: "/react",
  },
  {
    name: "博主 fishedee 的 formily 例子",
    path: createRouteComponent(() => import("@/page/Fishedee")),
    url: "/fishedee",
  },
  {
    name: "作业：自定义递增组件",
    path: createRouteComponent(() => import("@/page/ObjectBase")),
    url: "/object-base",
  },
  {
    name: "字节面试题：部门员工选择（formily 与 react 交互）",
    path: createRouteComponent(() => import("@/page/SelectSection")),
    url: "/select-section",
  },
];

export { createRouteComponent };

export default pathList;

type PathItem = {
  path: JSX.Element;
  url: string;
  hidden?: boolean;
  name?: string;
};
