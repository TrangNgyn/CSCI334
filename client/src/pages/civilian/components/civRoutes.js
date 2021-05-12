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
    element: <CheckInPage back="/civ/home"/>,
  },
  {
    path: "/civ/certs",
    element: <MyCertsPage back="/civ/home"/>,
  },
  {
    path: "/civ/hotspot",
    element: <HotSpotsPage back="/civ/home"/>,
  },
  {
    path: "/civ/rollout",
    element: <RolloutsPage back="/civ/home"/>,
  },
  {
    path: "/civ/stats",
    element: <StatsPage back="/civ/home"/>,
  },
];

export const civMenuRoutes = [
  {
    title: "Home",
    path: "/civ/home",
  },
  {
    title: "Check In",
    path: "/civ/checkin",
  },
];
