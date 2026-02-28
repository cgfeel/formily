import { TabsProps } from "antd";
import { Suspense, lazy } from "react";

const ArrayField = lazy(() => import("./components/arrayField"));
const ArrayFieldRenderProps = lazy(() => import("./components/arrayField/RenderProps"));
const ExpressionScope = lazy(() => import("./components/ExpressionScope"));
const Field = lazy(() => import("./components/field"));
const FormConsumer = lazy(() => import("./components/formConsumer"));
const FormProvider = lazy(() => import("./components/formProvider"));
const JsonSchema = lazy(() => import("./components/schemaField/JsonSchema"));
const MarkupSchema = lazy(() => import("./components/schemaField/MarkupSchema"));
const ObjectField = lazy(() => import("./components/objectField"));
const ObjectFieldRenderProps = lazy(() => import("./components/objectField/RenderProps"));
const RecordScopeJson = lazy(() => import("./components/RecordScope/JsonSchema"));
const RecordScopeMarkup = lazy(() => import("./components/RecordScope/MarkupSchema"));
const RecordsScopeJson = lazy(() => import("./components/RecordsScope/JsonSchema"));
const RecordsScopeMark = lazy(() => import("./components/RecordsScope/MarkupSchema"));
const ResuresionIncrementIncrement = lazy(() => import("./components/resursionField/Increment"));
const ResuresionFieldSimple = lazy(() => import("./components/resursionField/Simple"));
const VoidField = lazy(() => import("./components/voidField"));

const componentsItems: Exclude<TabsProps["items"], undefined> = [
  {
    disabled: true,
    key: "components",
    label: "Components",
  },
  {
    key: "field",
    label: "Field",
    children: (
      <Suspense fallback={<>Loading</>}>
        <Field />
      </Suspense>
    ),
  },
  {
    key: "arrayField",
    label: "ArrayField",
    children: (
      <Suspense fallback={<>Loading</>}>
        <ArrayField />
        <ArrayFieldRenderProps />
      </Suspense>
    ),
  },
  {
    key: "objectField",
    label: "ObjectField",
    children: (
      <Suspense fallback={<>Loading</>}>
        <ObjectField />
        <ObjectFieldRenderProps />
      </Suspense>
    ),
  },
  {
    key: "voidField",
    label: "VoidField",
    children: (
      <Suspense fallback={<>Loading</>}>
        <VoidField />
      </Suspense>
    ),
  },
  {
    key: "schemaField",
    label: "SchemaField",
    children: (
      <Suspense fallback={<>Loading</>}>
        <MarkupSchema />
        <JsonSchema />
      </Suspense>
    ),
  },
  {
    key: "resursionField",
    label: "ResursionField",
    children: (
      <Suspense fallback={<>Loading</>}>
        <ResuresionFieldSimple />
        <ResuresionIncrementIncrement />
      </Suspense>
    ),
  },
  {
    key: "formProvider",
    label: "FormProvider",
    children: (
      <Suspense fallback={<>Loading</>}>
        <FormProvider />
      </Suspense>
    ),
  },
  {
    key: "formConsumer",
    label: "FormConsumer",
    children: (
      <Suspense fallback={<>Loading</>}>
        <FormConsumer />
      </Suspense>
    ),
  },
  {
    key: "expressionScope",
    label: "ExpressionScope",
    children: (
      <Suspense fallback={<>Loading</>}>
        <ExpressionScope />
      </Suspense>
    ),
  },
  {
    key: "recordScope",
    label: "RecordScope",
    children: (
      <Suspense fallback={<>Loading</>}>
        <RecordScopeMarkup />
        <RecordScopeJson />
      </Suspense>
    ),
  },
  {
    key: "recordsScope",
    label: "RecordsScope",
    children: (
      <Suspense fallback={<>Loading</>}>
        <RecordsScopeMark />
        <RecordsScopeJson />
      </Suspense>
    ),
  },
];

export default componentsItems;
