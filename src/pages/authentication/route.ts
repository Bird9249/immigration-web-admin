import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const authenticationRoutes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("./Authentication")),
    children: [
      {
        path: "/login",
        component: lazy(() => import("./login/Login")),
      },
    ],
  },
];

export default authenticationRoutes;
