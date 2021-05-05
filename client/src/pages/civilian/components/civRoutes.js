import CivLandingPage from "../CivLandingPage";
import CivilianHome from "../home/CivilianHome";
import CheckInPage from "../checkIn/CheckInPage";
import HotSpotsPage from "../hotSpot/HotSpotsPage";
import MyCertsPage from "../myCerts/MyCertsPage";
import RolloutsPage from "../rollout/RolloutsPage";
import StatsPage from "../stats/StatsPage";

export const civRoutes = [
  {
    element: <CivLandingPage />,
  },
  {
    path: "/civ/home",
    element: <CivilianHome />,
  },
  {
    path: "/civ/checkin",
    element: <CheckInPage />,
  },
  {
    path: "/civ/certs",
    element: <MyCertsPage />,
  },
  {
    path: "/civ/hotspot",
    element: <HotSpotsPage />,
  },
  {
    path: "/civ/rollout",
    element: <RolloutsPage />,
  },
  {
    path: "/civ/stats",
    element: <StatsPage />,
  },
];

export const civMenuRoutes = [
  {
    title: "Home",
    path: "civ/home",
  },
  {
    title: "Check In",
    path: "civ/checkin",
  },
];
