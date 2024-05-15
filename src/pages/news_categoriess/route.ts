import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const newCategoriessRoutes: RouteDefinition[] = [
  {
    path: "/newsCategoriess",
    component: lazy(() => import("./NewsCategoriess")),
    children: [
      {
        path: "/list",
        component: lazy(() => import("./news_categories/NewCategoriess")),
      },
      {
        path: "/create",
        component: lazy(() => import("./news_categories/CreateNewCategoriess")),
      },
      {
        path: "/edit/:id",
        component: lazy(() => import("./news_categories/EditNewCategoriess")),
      },
      {
        path: "/news",
        component: lazy(() => import("./news/News")),
      },
      {
        path: "/news/create",
        component: lazy(() => import("./news/CreateNew")),
      },
      {
        path: "/news/edit/:id",
        component: lazy(() => import("./news/EditNew")),
      },
      {
        path: "/news/detail/:id",
        component: lazy(() => import("./news/DetailNew")),
      },
    ],
  },
];

export default newCategoriessRoutes;
