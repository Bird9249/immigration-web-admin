import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const ServiceRoutes: RouteDefinition[] = [
  {
    path: "/service",
    component: lazy(() => import("./Service")),
    children: {
      component: lazy(() => import("./service/ServiceData")),
    },
  },
  {
    path: "/service/create",
    component: lazy(() => import("./service/CreateService")),
  },
  {
    path: "/service/edit/:id",
    component: lazy(() => import("./service/EditService")),
  },
];

export default ServiceRoutes;
