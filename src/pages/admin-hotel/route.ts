import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const adminHotelRoutes: RouteDefinition[] = [
  {
    path: "/admin-hotels",
    component: lazy(() => import("./AdminHotel")),
  },
  {
    path: "/admin-hotels/:id",
    component: lazy(() => import("./DetailGuest")),
  },
];

export default adminHotelRoutes;
