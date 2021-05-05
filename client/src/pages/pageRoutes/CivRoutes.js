import LandingPage from "../civilian/LandingPage";
import CivilianHome from "../civilian/home/CivilianHome";
import CheckInPage from "../civilian/checkIn/CheckInPage";
import HotSpotsPage from "../civilian/hotSpot/HotSpotsPage";
import MyCertsPage from "../civilian/myCerts/MyCertsPage";
import RolloutsPage from "../civilian/rollout/RolloutsPage";
import StatsPage from "../civilian/stats/StatsPage";

export const civRoutes = [
  {
    path: "civ/",
    exact: "true",
    component: LandingPage,
  },
  {
    path: "civ/home",
    exact: "true",
    component: CivilianHome,
  },
  {
    path: "civ/checkin",
    exact: "true",
    component: CheckInPage,
  },
  {
    path: "civ/certs",
    exact: "true",
    component: MyCertsPage,
  },
  {
    path: "civ/hotspot",
    exact: "true",
    component: HotSpotsPage,
  },
  {
    path: "civ/rollout",
    exact: "true",
    component: RolloutsPage,
  },
  {
    path: "civ/stats",
    exact: "true",
    component: StatsPage,
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
  {
    title: "Logout",
    path: "civ/Logout",
  },
];
