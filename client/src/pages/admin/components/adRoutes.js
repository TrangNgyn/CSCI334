// Civilian
import AdLandingPage from "../AdLandingPage";
import Organizations from "../org/Organizations";

export const adRoutes = [
  {
    path: "/",
    element: <AdLandingPage />,
  },
  {
    path: "/ad/org",
    element: <Organizations />,
  }
];

export const adMenuRoutes = [
  {
    title: "Organisations",
    path: "/ad/org",
  },
];
