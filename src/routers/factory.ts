import { createBrowserRouter, createMemoryRouter } from "react-router";
import routes from "./routes";

const basename = process.env.NODE_ENV === "production" ? "/formily/" : "/";

export default function createRouter({ strategy, initialPathname = "/" }: CreateRouterProps) {
  return strategy === "browser"
    ? createBrowserRouter(routes, { basename })
    : createMemoryRouter(routes, { initialEntries: [initialPathname], basename });
}

export type RoutingStrategy = "browser" | "memory";

interface CreateRouterProps {
  initialPathname?: string;
  strategy?: RoutingStrategy;
}
