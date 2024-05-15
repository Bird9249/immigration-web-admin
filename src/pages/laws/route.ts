import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const lawsRoutes: RouteDefinition[] = [
  {
    path: "/laws",
    component: lazy(() => import("./law/Law")),
  },
  {
    path: "/laws/create",
    component: lazy(() => import("./law/CreateLaw")),
  },
  {
    path: "/laws/edit/:id",
    component: lazy(() => import("./law/EditLaw")),
  },
  {
    path: "/laws/detail/:id",
    component: lazy(() => import("./law/DetailLaw")),
  },
];

export default lawsRoutes;
