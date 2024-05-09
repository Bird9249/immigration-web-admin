import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";
import accommodationRequestRoutes from "./pages/accommodation-requests/route";
import adminHotelRoutes from "./pages/admin-hotel/route";
import authenticationRoutes from "./pages/authentication/route";
import bannerRoutes from "./pages/banner-hero/route";
import feedbackRoutes from "./pages/feedbacks/route";
import hotelRoutes from "./pages/hotels/route";
import registrationRoutes from "./pages/registrations/route";
import userRoutes from "./pages/users/route";
<<<<<<< HEAD
import newCategoriessRoutes from "./pages/news_categoriess/route";
=======
import visaCategoryRoutes from "./pages/visa-category/route";
>>>>>>> a294dd5a6a68bbd140463c45dd04b202ea26b4c5

const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("./layouts/base/BaseLayout")),
    children: [
      {
        path: "/dashboard",
        component: lazy(() => import("./pages/dashboard/Dashboard")),
      },
      ...userRoutes,
<<<<<<< HEAD
      ...newCategoriessRoutes,

=======
      ...hotelRoutes,
      ...accommodationRequestRoutes,
      ...registrationRoutes,
      ...feedbackRoutes,
      ...bannerRoutes,
      ...visaCategoryRoutes,
      ...adminHotelRoutes,
>>>>>>> a294dd5a6a68bbd140463c45dd04b202ea26b4c5
      {
        path: "/*all",
        component: lazy(() => import("./pages/errors/PageNotFound")),
      },
    ],
  },
  ...authenticationRoutes,
];

export default routes;
