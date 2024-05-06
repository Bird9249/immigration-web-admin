import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";
import authenticationRoutes from "./pages/authentication/route";
import userRoutes from "./pages/users/route";
import countriesRoutes from "./pages/countries/route";

const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("./layouts/base/BaseLayout")),
    children: [
      {
        path: "/dashboard",
        component: lazy(() => import("./pages/dashboard/Dashboard")),
      },
      ...userRoutes,
      ...countriesRoutes,

      {
        path: "/*all",
        component: lazy(() => import("./pages/errors/PageNotFound")),
      },
    ],
  },
  ...authenticationRoutes,
];

export default routes;
