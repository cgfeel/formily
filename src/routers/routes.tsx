import { FC, PropsWithChildren } from "react";
import { Outlet, useLocation } from "react-router";
import Breads from "@/components/Breads";
import RedirectHandler from "@/components/RedirectHandler";
import pathList, { createRouteComponent } from "./pathList";

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
