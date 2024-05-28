import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const lostPassportRoutes: RouteDefinition[] = [
  {
    path: "/lost-passport",
    component: lazy(() => import("./LostPassports")),
    children: {
      component: lazy(() => import("./lost-passports/LostPassport")),
    },
  },
  {
    path: "/lost-passport/create",
    component: lazy(() => import("./lost-passports/CreateLostPassport")),
  },
  {
    path: "/lost-passport/edit/:id",
    component: lazy(() => import("./lost-passports/EditLostPassport")),
  },
];

export default lostPassportRoutes;
