import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const registrationRoutes: RouteDefinition[] = [
  {
    path: "/registrations",
    component: lazy(() => import("./Registration")),
    children: [
      {
        path: "/arrival",
        component: lazy(() => import("./arrival/Arrival")),
      },
      {
        path: "/arrival/:id",
        component: lazy(() => import("./arrival/ArrivalDetail")),
      },
      {
        path: "/departure",
        component: lazy(() => import("./departure/Departure")),
      },
      {
        path: "/departure/:id",
        component: lazy(() => import("./departure/DepartureDetail")),
      },
      {
        path: "/number",
        component: lazy(() => import("./number/Number")),
      },
    ],
  },
];

export default registrationRoutes;
