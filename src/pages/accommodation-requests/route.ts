import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const accommodationRequestRoutes: RouteDefinition[] = [
  {
    path: "/accommodation-request",
    component: lazy(() => import("./Accommodation-Requests")),
  },
  {
    path: "/accommodation-request/create",
    component: lazy(
      () => import("./accommodation-request/CreateAccommodationRequest")
    ),
  },
  {
    path: "/accommodation-request/edit/:id",
    component: lazy(
      () => import("./accommodation-request/EditAccommodationRequest")
    ),
  },
  {
    path: "/accommodation-request/detail/:id",
    component: lazy(
      () => import("./accommodation-request/DetailAccommodationRequest")
    ),
  },
];

export default accommodationRequestRoutes;
