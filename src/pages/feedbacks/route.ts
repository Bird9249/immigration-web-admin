import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const feedbackRoutes: RouteDefinition[] = [
  {
    path: "/feedback",
    component: lazy(() => import("./Feedbacks")),
    children: [
      {
        path: "/list",
        component: lazy(() => import("./feedback/Feedback")),
      },
      {
        path: "/detail",
        component: lazy(() => import("./feedback/DetailFeedback")),
      },
    ],
  },
];

export default feedbackRoutes;
