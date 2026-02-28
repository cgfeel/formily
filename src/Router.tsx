import { FC, Suspense, useEffect } from "react";
import { RouterKey, router } from "./list";
import BreadCrumb from "./components/BreadCrunb";

const RouterApp: FC<RouterAppProps> = ({ name }) => {
  const item = router[name];
  const Router = item.path;

  useEffect(() => {
    if (item) {
      document.title = item.name;
    }
  }, [item]);

  return (
    <BreadCrumb pathname={name}>
      <Suspense fallback={<>Loading...</>}>
        <Router />
      </Suspense>
    </BreadCrumb>
  );
};

export default function Router() {
  const { pathname } = window.location;
  const path = `/${pathname.split("/").pop()}`;
  const name = (path in router ? path : void 0) as RouterKey | undefined;

  return name === void 0 ? <>This page is 404.</> : <RouterApp name={name} />;
}

interface RouterAppProps {
  name: RouterKey;
}
