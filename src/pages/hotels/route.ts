import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const hotelRoutes: RouteDefinition[] = [
  {
    path: "/hotels",
    component: lazy(() => import("./hotel/Hotel")),
  },
  {
    path: "/hotels/create",
    component: lazy(() => import("./hotel/CreateHotel")),
  },
  {
    path: "/hotels/edit/:id",
    component: lazy(() => import("./hotel/EditHotel")),
  },
  {
    path: "/hotels/detail/:id",
    component: lazy(() => import("./hotel/DetailHotel")),
  },
];

export default hotelRoutes;
