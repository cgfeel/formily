import { ComponentType, lazy, ReactNode, Suspense } from "react";

export function createRouteComponentBindLoading(loading?: ReactNode): CreateRouteComponentFunc {
  return (loader, loadingOther) => {
    const Component = lazy(loader);
    return (
      <Suspense fallback={loadingOther ?? loading}>
        <Component />
      </Suspense>
    );
  };
}

type CreateRouteComponentFunc = (
  loader: () => Promise<{ default: ComponentType }>,
  loadingOther?: ReactNode,
) => JSX.Element;
