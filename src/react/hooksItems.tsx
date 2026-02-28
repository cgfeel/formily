import { TabsProps } from "antd";
import { Suspense, lazy } from "react";

const UseExpressionScope = lazy(() => import("./hooks/useExpressionScope"));
const UseFieldJsx = lazy(() => import("./hooks/useField/FildJsx"));
const UseFieldMarkup = lazy(() => import("./hooks/useField/MarkupSchema"));
const UseFieldSchema = lazy(() => import("./hooks/useFieldSchema"));
const UseForm = lazy(() => import("./hooks/useForm"));
const UseFormEffect = lazy(() => import("./hooks/useFormEffects"));
const UseParentForm = lazy(() => import("./hooks/useParentForm"));

const hooksItems: Exclude<TabsProps["items"], undefined> = [
  {
    disabled: true,
    key: "hooks",
    label: "Hooks",
  },
  {
    key: "useExpressionScope",
    label: "useExpressionScope",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <UseExpressionScope />
      </Suspense>
    ),
  },
  {
    key: "useField",
    label: "useField",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <UseFieldMarkup />
        <UseFieldJsx />
      </Suspense>
    ),
  },
  {
    key: "useFieldSchema",
    label: "useFieldSchema",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <UseFieldSchema />
      </Suspense>
    ),
  },
  {
    key: "useForm",
    label: "useForm",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <UseForm />
      </Suspense>
    ),
  },
  {
    key: "useFormEffect",
    label: "useFormEffect",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <UseFormEffect />
      </Suspense>
    ),
  },
  {
    key: "useParentForm",
    label: "useParentForm",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <UseParentForm />
      </Suspense>
    ),
  },
];

export default hooksItems;
