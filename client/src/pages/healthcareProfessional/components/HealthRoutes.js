import HealthLandingPage from "../HealthLandingPage";
import FindUserPage from "../findUser/findUserPage";
import Healthtools from "../healthTools/healthTools";
import HealthHomePage from "../home/HealthHomePage";
import UpdateVaccination from "../healthTools/updateVaccination";
import AddVaccination from "../healthTools/addVaccination";
import AddCase from "../healthTools/addCase";
import CheckinPage from "../../civilian/checkIn/CheckInPage";
import MyCertifications from "../../civilian/myCerts/MyCertsPage";
import HotspotMap from "../../civilian/hotSpot/HotSpotsPage";
import RolloutMap from "../../civilian/rollout/RolloutsPage";
import ViewStats from "../../civilian/stats/StatsPage";

export const healthRoutes = [
  {
    element: <HealthLandingPage />,
  },
  {
    path: "/hea/home",
    element: <HealthHomePage />,
  },
  {
    path: "/hea/checkin",
    element: <CheckinPage back="/hea/home"/>,
  },
  {
    path: "/hea/finduser",
    element: <FindUserPage />,
  },
  {
    path: "/hea/certs",
    element: <MyCertifications back="/hea/home"/>,
  },
  {
    path: "/hea/hotspot",
    element: <HotspotMap back="/hea/home"/>,
  },
  {
    path: "/hea/rollout",
    element: <RolloutMap back="/hea/home"/>,
  },
  {
    path: "/hea/stats",
    element: <ViewStats back="/hea/home"/>,
  },
  {
    path: "/hea/healthtools",
    element: <Healthtools />,
  },
  {
    path: "/hea/healthtools/updatevaccination",
    element: <UpdateVaccination />,
  },
  {
    path: "/hea/healthtools/addvaccination",
    element: <AddVaccination />,
  },
  {
    path: "/hea/healthtools/addcase",
    element: <AddCase />,
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
