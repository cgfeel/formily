import { Alert, Tabs, TabsProps } from "antd";
import { FC, Suspense, lazy } from "react";

const AntdArray = lazy(() => import("../fishedee/antdArray"));
const AntdBase = lazy(() => import("../fishedee/antdBase"));
const AntdLayout = lazy(() => import("../fishedee/antdLayout"));
const AntdReact = lazy(() => import("../fishedee/antdReact"));
const ChildrenRender = lazy(() => import("../fishedee/reactField/childrenRender"));
const Controlled = lazy(() => import("../fishedee/controlled"));
const CoreForm = lazy(() => import("../fishedee/coreForm"));
const CoreReaction = lazy(() => import("../fishedee/coreReaction"));
const CoreReactive = lazy(() => import("../fishedee/coreReactive"));
const Count = lazy(() => import("../fishedee/count"));
const CreateField = lazy(() => import("../fishedee/createField"));
const CustomField = lazy(() => import("../fishedee/customField"));
const CustomJsonSchema = lazy(() => import("../fishedee/customSchema/JsonSchema"));
const CustomMarkupSchema = lazy(() => import("../fishedee/customSchema/MarkupSchema"));
const CustomTable = lazy(() => import("../fishedee/customTable"));
const Display = lazy(() => import("../fishedee/display"));
const FieldAction = lazy(() => import("../fishedee/fieldAction"));
const FieldEffectHooks = lazy(() => import("../core/fieldEffectHooks"));
const FormEffectHooks = lazy(() => import("../core/formEffectHooks"));
const FormPath = lazy(() => import("../core/formPath"));
const InitialValue = lazy(() => import("../fishedee/initialvalue"));
const Layout = lazy(() => import("../page/Layout"));
const Linkage = lazy(() => import("./LinkAges"));
const Pattern = lazy(() => import("../fishedee/pattern"));
const ReactField = lazy(() => import("../fishedee/reactField"));
const ReactFaq = lazy(() => import("../fishedee/reactFaq"));
const ReactiveOther = lazy(() => import("../fishedee/reactiveOther"));
const SchemaField = lazy(() => import("../fishedee/schemaField"));
const SchemaReaction = lazy(() => import("../fishedee/schemaReaction"));
const ValidateInput = lazy(() => import("../fishedee/validateInput"));
const ValidateRule = lazy(() => import("../fishedee/validateInput/Rule"));
const ValidateType = lazy(() => import("../fishedee/validateInput/ValidateType"));

const EffectAlert: FC = () => (
    <Alert
        type="warning"
        message="生命周期用了官方文档演示，fish 文档中通过 console 演示不够直观也不够全面"
        style={{ marginBottom: 24, marginTop: 24 }}
    />
);

const items: TabsProps["items"] = [
    {
        disabled: true,
        key: "reactive",
        label: "reactive",
    },
    {
        key: "observer-count",
        label: "5: 计数器",
        children: (
            <Suspense fallback={<>loading...</>}>
                <Count />
            </Suspense>
        ),
    },
    {
        key: "reactive-other",
        label: "reactive:  其他",
        children: (
            <Suspense fallback={<>loading...</>}>
                <ReactiveOther />
            </Suspense>
        ),
    },
    {
        key: "reactive-form",
        label: "core.0: reactive 实现表单",
        children: (
            <Suspense fallback={<>loading...</>}>
                <CoreReactive />
            </Suspense>
        ),
    },
    {
        disabled: true,
        key: "core",
        label: "core",
    },
    {
        key: "field-value",
        label: "1: 字段值的获取与更新",
        children: (
            <Suspense fallback={<>loading...</>}>
                <FieldAction />
                <InitialValue />
            </Suspense>
        ),
    },
    {
        key: "display",
        label: "2: 展示状态",
        children: (
            <Suspense fallback={<>loading...</>}>
                <Display />
            </Suspense>
        ),
    },
    {
        key: "validate",
        label: "3: 校验和反馈",
        children: (
            <Suspense fallback={<>loading...</>}>
                <ValidateInput />
                <ValidateType />
                <ValidateRule />
            </Suspense>
        ),
    },
    {
        key: "pattern",
        label: "4: 交互模式",
        children: (
            <Suspense fallback={<>loading...</>}>
                <Pattern />
            </Suspense>
        ),
    },
    {
        key: "form-effect",
        label: "5.1: 表单生命周期",
        children: (
            <Suspense fallback={<>loading...</>}>
                <EffectAlert />
                <FormEffectHooks />
            </Suspense>
        ),
    },
    {
        key: "field-effect",
        label: "5.2: 字段生命周期",
        children: (
            <Suspense fallback={<>loading...</>}>
                <EffectAlert />
                <FieldEffectHooks />
            </Suspense>
        ),
    },
    {
        key: "core-reaction",
        label: "6: 依赖追踪",
        children: (
            <Suspense fallback={<>loading...</>}>
                <CoreReaction />
            </Suspense>
        ),
    },
    {
        key: "create-field",
        label: "7: 字段类型",
        children: (
            <Suspense fallback={<>loading...</>}>
                <CreateField />
            </Suspense>
        ),
    },
    {
        key: "form-path",
        label: "8: 字段路径",
        children: (
            <Suspense fallback={<>loading...</>}>
                <Alert
                    type="warning"
                    message="建议通过官方文档了解，fish 只演示了一部分，分别是：8.1.1.相对路径、8.1.2.点路径、8.1.3.相对路径、8.1.4.分组匹配、8.1.5.范围匹配、8.2.1-2.2.分组匹配赋值"
                    style={{ marginBottom: 24, marginTop: 24 }}
                />
                <FormPath />
            </Suspense>
        ),
    },
    {
        key: "controlled",
        label: "9: 表单受控",
        children: (
            <Suspense fallback={<>loading...</>}>
                <Alert
                    type="warning"
                    message="建议通过官方文档了解，fish 文档中的问题受控纠正中说明了"
                    style={{ marginBottom: 24, marginTop: 24 }}
                />
                <Controlled />
            </Suspense>
        ),
    },
    {
        key: "core-form",
        label: "10: reactive + core 实现表单",
        children: (
            <Suspense fallback={<>loading...</>}>
                <CoreForm />
            </Suspense>
        ),
    },
    {
        disabled: true,
        key: "react",
        label: "react",
    },
    {
        key: "field",
        label: "1: Field 的 React 实现",
        children: (
            <Suspense fallback={<>loading...</>}>
                <ReactField />
            </Suspense>
        ),
    },
    {
        key: "field-example",
        label: "1: Field 实践案例",
        children: (
            <Suspense fallback={<>loading...</>}>
                <ChildrenRender />
            </Suspense>
        ),
    },
    {
        key: "schema-field",
        label: "2: 字段模型 SchemaField",
        children: (
            <Suspense fallback={<>loading...</>}>
                <SchemaField />
            </Suspense>
        ),
    },
    {
        key: "custom-field",
        label: "3: 复现 Field",
        children: (
            <Suspense fallback={<>loading...</>}>
                <CustomField />
            </Suspense>
        ),
    },
    {
        key: "custom-schema",
        label: "4: 复现 Schema",
        children: (
            <Suspense fallback={<>loading...</>}>
                <CustomJsonSchema />
                <CustomMarkupSchema />
            </Suspense>
        ),
    },
    {
        key: "schema-linkage",
        label: "5: Schema 联动 - 官方",
        children: (
            <Suspense fallback={<>loading...</>}>
                <Alert
                    type="warning"
                    message="推荐查看官方文档演示，fish 文档中只演示了循环联动的一部分"
                    style={{ marginBottom: 24, marginTop: 24 }}
                />
                <Linkage />
            </Suspense>
        ),
    },
    {
        key: "schema-reaction",
        label: "5: Schema 联动 - 非官方",
        children: (
            <Suspense fallback={<>loading...</>}>
                <SchemaReaction />
            </Suspense>
        ),
    },
    {
        key: "custom-table",
        label: "6: 字段特性",
        children: (
            <Suspense fallback={<>loading...</>}>
                <CustomTable />
            </Suspense>
        ),
    },
    {
        key: "react-faq",
        label: "7: 字段操作和响应",
        children: (
            <Suspense fallback={<>loading...</>}>
                <ReactFaq />
            </Suspense>
        ),
    },
    {
        disabled: true,
        key: "antd-v5",
        label: "Antd-v5",
    },
    {
        key: "antd-base",
        label: "1: 基础组件",
        children: (
            <Suspense fallback={<>loading...</>}>
                <AntdBase />
            </Suspense>
        ),
    },
    {
        key: "antd-react",
        label: "2: 表单展现形式",
        children: (
            <Suspense fallback={<>loading...</>}>
                <AntdReact />
            </Suspense>
        ),
    },
    {
        key: "form-layout-1",
        label: "3: 表单布局-1",
        children: (
            <Suspense fallback={<>loading...</>}>
                <Alert message="文档示例来自官方文档，推荐直接查看官方示例" type="warning" />
                <Layout />
            </Suspense>
        ),
    },
    {
        key: "form-layout-2",
        label: "3: 布局补充-2",
        children: (
            <Suspense fallback={<>loading...</>}>
                <AntdLayout />
            </Suspense>
        ),
    },
    {
        key: "antd-array",
        label: "4: 数组组件",
        children: (
            <Suspense fallback={<>loading...</>}>
                <AntdArray />
            </Suspense>
        ),
    },
];

const Fishedee: FC = () => <Tabs defaultActiveKey="observer-count" tabPosition="left" items={items} />;

export default Fishedee;
