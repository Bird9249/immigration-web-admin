import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";
import adminHotelRoutes from "./pages/admin-hotel/route";
import authenticationRoutes from "./pages/authentication/route";
import bannerRoutes from "./pages/banner-hero/route";
import provinceRoutes from "./pages/checkpoints/route";
import contactsRoutes from "./pages/contacts/route";
import countriesRoutes from "./pages/countries/route";
import feedbackRoutes from "./pages/feedbacks/route";
import hotelRoutes from "./pages/hotels/route";
import lawsRoutes from "./pages/laws/route";
import newCategoriessRoutes from "./pages/news_categoriess/route";
import registrationRoutes from "./pages/registrations/route";
import ServiceRoutes from "./pages/service/route";
import userRoutes from "./pages/users/route";
import visaCategoryRoutes from "./pages/visa-category/route";

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
      ...newCategoriessRoutes,
      ...countriesRoutes,
      ...contactsRoutes,
      ...lawsRoutes,
      ...hotelRoutes,
      ...registrationRoutes,
      ...feedbackRoutes,
      ...bannerRoutes,
      ...visaCategoryRoutes,
      ...adminHotelRoutes,
      ...provinceRoutes,

      ...ServiceRoutes,
      {
        path: "/*all",
        component: lazy(() => import("./pages/errors/PageNotFound")),
      },
    ],
  },
  ...authenticationRoutes,
];

export default routes;
