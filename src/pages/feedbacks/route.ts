import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const feedbackRoutes: RouteDefinition[] = [
  {
    path: "/feedback",
    component: lazy(() => import("./feedback/Feedback")),
  },
  {
    path: "/feedback/:id",
    component: lazy(() => import("./feedback/DetailFeedback")),
  },
];

export default feedbackRoutes;
