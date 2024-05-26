import { Alert, Tabs, TabsProps } from "antd";
import { FC, Suspense, lazy } from "react";

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
const Display = lazy(() => import("../fishedee/display"));
const FieldAction = lazy(() => import("../fishedee/fieldAction"));
const FieldEffectHooks = lazy(() => import("../core/fieldEffectHooks"));
const FormEffectHooks = lazy(() => import("../core/formEffectHooks"));
const FormPath = lazy(() => import("../core/formPath"));
const InitialValue = lazy(() => import("../fishedee/initialvalue"));
const Linkage = lazy(() => import("./LinkAges"));
const Pattern = lazy(() => import("../fishedee/pattern"));
const ReactField = lazy(() => import("../fishedee/reactField"));
const ReactiveOther = lazy(() => import("../fishedee/reactiveOther"));
const SchemaField = lazy(() => import("../fishedee/schemaField"));
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
        label: "4: 复现字段模型",
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
                    message="联动用了官方文档演示，fish 文档中只演示了循环联动的一部分，不够直观也不够全面"
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
                <Alert
                    type="warning"
                    message="联动用了官方文档演示，fish 文档中只演示了循环联动的一部分，不够直观也不够全面"
                    style={{ marginBottom: 24, marginTop: 24 }}
                />
                <Linkage />
            </Suspense>
        ),
    },
];

const Fishedee: FC = () => <Tabs defaultActiveKey="observer-count" tabPosition="left" items={items} />;

export default Fishedee;
