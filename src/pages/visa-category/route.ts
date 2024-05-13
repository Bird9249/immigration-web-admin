import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const visaCategoryRoutes: RouteDefinition[] = [
  {
    path: "/visa-category",
    component: lazy(() => import("./Visa")),
    children: {
      component: lazy(() => import("./visa-category/VisaCategory")),
    },
  },
  {
    path: "/visa-category/create",
    component: lazy(() => import("./visa-category/CreateVisaCategory")),
  },
  {
    path: "/visa-category/edit/:id",
    component: lazy(() => import("./visa-category/EditVisaCategory")),
  },
];

export default visaCategoryRoutes;
