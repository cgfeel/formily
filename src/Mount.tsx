import { FC } from "react";
import { RouterProvider } from "react-router/dom";
import createRouter from "@/routers/factory";

const Mount: FC = () => {
  const router = createRouter({ strategy: "browser" });
  return <RouterProvider router={router} />;
};

export default Mount;
