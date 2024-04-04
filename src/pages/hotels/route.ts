import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const hotelRoutes: RouteDefinition[] = [
  {
    path: "/hotels",
    component: lazy(() => import("./Hotels")),
    children: [
      {
        path: "/list",
        component: lazy(() => import("./hotel/Hotel")),
      },
      {
        path: "/create",
        component: lazy(() => import("./hotel/CreateHotel")),
      },
      {
        path: "/edit/:id",
        component: lazy(() => import("./hotel/EditHotel")),
      },
      {
        path: "/detail/:id",
        component: lazy(() => import("./hotel/DetailHotel")),
      },
    ],
  },
];

export default hotelRoutes;
