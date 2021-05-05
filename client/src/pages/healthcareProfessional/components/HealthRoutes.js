import HealthLandingPage from "../HealthLandingPage";
import FindUserPage from "../findUser/findUserPage";
import Healthtools from "../healthTools/healthTools";
import HealthHomePage from "../home/HealthHomePage";

export const healthRoutes = [
  {
    element: <HealthLandingPage />,
  },
  {
    path: "/hea/home",
    element: <HealthHomePage />,
  },
  {
    path: "/hea/finduser",
    element: <FindUserPage />,
  },
  {
    path: "/hea/healthtools",
    element: <Healthtools />,
  },
];

export const healthMenuRoutes = [
  {
    title: "Home",
    path: "hea/home",
  },
  {
    title: "Find User",
    path: "hea/finduser",
  },
];
