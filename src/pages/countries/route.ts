import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const countriesRoutes: RouteDefinition[] = [
  {
    path: "/countries",
    component: lazy(() => import("./countrie/Countrie")),
  },
  {
    path: "/countries/create",
    component: lazy(() => import("./countrie/CreateCountrie")),
  },
  {
    path: "/countries/edit/:id",
    component: lazy(() => import("./countrie/EditCountrie")),
  },
  {
    path: "/countries/detail/:id",
    component: lazy(() => import("./countrie/DetailCountrie")),
  },
];

export default countriesRoutes;
