import { FC } from "react";
import createRouter from "@/routers/factory";
import { RouterProvider } from "react-router";

const Mount: FC = () => {
  const router = createRouter({ strategy: "browser" });
  return <RouterProvider router={router} />;
};

export default Mount;
