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
      {
        path: "/edit/:id",
        component: lazy(() => import("./banners/EditBanner")),
      },
      {
        path: "/popup",
        component: lazy(() => import("./popups/Popup"))
      },
      {
        path: "/popup/create",
        component: lazy(() => import("./popups/CreatePopup"))
      },
      {
        path: "/popup/edit/:id",
        component: lazy(() => import("./popups/EditPopup"))
      }
    ],
  },
];

export default bannerRoutes;
