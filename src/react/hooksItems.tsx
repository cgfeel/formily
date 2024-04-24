import { TabsProps } from "antd";
import { Suspense, lazy } from "react";

const UseExpressionScope = lazy(() => import("./hooks/useExpressionScope"));

const hooksItems: Exclude<TabsProps["items"], undefined> = [
    {
        disabled: true,
        key: "hooks",
        label: "Hooks",
    },
    {
        key: "useExpressionScope",
        label: "UseExpressionScope",
        children: (
            <Suspense fallback={<>Loading...</>}>
                <UseExpressionScope />
            </Suspense>
        ),
    },
];

export default hooksItems;
