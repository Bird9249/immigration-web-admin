import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const provinceRoutes: RouteDefinition[] = [
  {
    path: "/checkpoint",
    component: lazy(() => import("./Checkpoint")),
    children: [
      { path: "/", component: lazy(() => import("./checkpoint/Checkpoint")) },
      {
        path: "/create",
        component: lazy(() => import("./checkpoint/CreateCheckpoint")),
      },
      {
        path: "/edit/:id",
        component: lazy(() => import("./checkpoint/EditCheckpoint")),
      },
      {
        path: "/:id",
        component: lazy(() => import("./checkpoint/DetailCheckpoint")),
      },
      {
        path: "/category",
        component: lazy(() => import("./category/CheckpointCategory")),
      },
      {
        path: "/category/create",
        component: lazy(() => import("./category/CreateCheckpointCategory")),
      },
      {
        path: "/category/edit/:id",
        component: lazy(() => import("./category/EditCheckpointCategory")),
      },
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
