import createRouter from "@/routers/factory";
import { FC } from "react";
import { RouterProvider } from "react-router";

const Mount: FC = () => {
  const router = createRouter({ strategy: "browser" });
  return <RouterProvider router={router} />;
};

export default Mount;
