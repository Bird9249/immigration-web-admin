import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const contactsRoutes: RouteDefinition[] = [
  {
    path: "/contacts",
    component: lazy(() => import("./contact/Contact")),
  },
  {
    path: "/contacts/detail/:id",
    component: lazy(() => import("./contact/DetailContact")),
  },
];

export default contactsRoutes;
