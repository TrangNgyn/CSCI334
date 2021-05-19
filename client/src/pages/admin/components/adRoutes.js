// Civilian
import AdLandingPage from "../AdLandingPage";
import Home from "../home/Home";
import Organizations from "../org/Organizations";
import Civilians from "../civ/Civilians";

export const adRoutes = [
  {
    path: "/",
    element: <AdLandingPage />,
  },
  // {
  //   path: "/ad/home",
  //   element: <Home />,
  // },
  {
    path: "/ad/org",
    element: <Organizations />,
  },
  // {
  //   path: "/ad/civ",
  //   element: <Civilians />,
  // },
];

export const adMenuRoutes = [
  {
    title: "Organisations",
    path: "/ad/org",
  },
];
