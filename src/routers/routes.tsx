import { FC, PropsWithChildren, useEffect } from "react";
import pathList, { createRouteComponent } from "./pathList";
import { Outlet, useLocation, useNavigate } from "react-router";
import Breads from "@/components/Breads";

const RedirectHandler: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 解析URL中的redirect参数
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPath = urlParams.get("redirect");

    if (redirectPath) {
      // 移除redirect参数，跳转到原路由（保留其他查询参数）
      urlParams.delete("redirect");
      const newSearch = urlParams.toString() ? `?${urlParams.toString()}` : "";
      navigate(`${redirectPath}${newSearch}`, { replace: true });
    }
  }, [navigate]);

  return null; // 无UI渲染，仅处理逻辑
};

const NavigationManager: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  return (
    <>
      <RedirectHandler />
      {location.pathname === "/" ? children : <Breads>{children}</Breads>}
    </>
  );
};

const routes = [
  {
    children: pathList.map(({ name, path, url }) => ({
      element: path,
      handle: {
        title: name,
      },
      path: url,
    })),
    element: (
      <NavigationManager>
        <Outlet />
      </NavigationManager>
    ),
    handle: {
      title: "索引页",
    },
    path: "/",
  },
  {
    path: "*",
    element: createRouteComponent(() => import("@/page/NotFound")),
  },
];

export default routes;
