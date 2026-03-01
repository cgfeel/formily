import { FC } from "react";
import createRouter from "@/routers/factory";

// @ts-ignore
import { RouterProvider } from "react-router/dom";

const Mount: FC = () => {
  const router = createRouter({ strategy: "browser" });
  return <RouterProvider router={router} />;
};

export default Mount;
