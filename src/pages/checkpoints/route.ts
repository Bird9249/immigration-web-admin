import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const provinceRoutes: RouteDefinition[] = [
  {
    path: "/checkpoint",
    component: lazy(() => import("./Checkpoint")),
    children: [
      //   {
      //     path: "/list",
      //     component: lazy(() => import("./news_categories/NewCategoriess")),
      //   },
      //   {
      //     path: "/create",
      //     component: lazy(() => import("./news_categories/CreateNewCategoriess")),
      //   },
      //   {
      //     path: "/edit/:id",
      //     component: lazy(() => import("./news_categories/EditNewCategoriess")),
      //   },
      {
        path: "/province",
        component: lazy(() => import("./province/Province")),
      },
      {
        path: "/province/create",
        component: lazy(() => import("./province/CreateProvince")),
      },
      {
        path: "/province/edit/:id",
        component: lazy(() => import("./province/EditProvince")),
      },
      {
        path: "/province/detail/:id",
        component: lazy(() => import("./province/DetailProvince")),
      },
    ],
  },
];

export default provinceRoutes;
