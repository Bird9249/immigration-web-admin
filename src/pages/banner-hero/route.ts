import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const bannerRoutes: RouteDefinition[] = [
  {
    path: "/banner",
    component: lazy(() => import("./Banner")),
    children: [
      {
        path: "/list",
        component: lazy(() => import("./banners/Banner")),
      },
      {
        path: "/create",
        component: lazy(() => import("./banners/CreateBanner")),
      },
      // {
      //   path: "/edit/:id",
      //   component: lazy(() => import("./banners/EditBanner")),
      // },
    ],
  },
];

export default bannerRoutes;
