// Civilian
import CivLandingPage from "../CivLandingPage";
import CivilianHome from "../home/CivilianHome";
import CheckInPage from "../checkIn/CheckInPage";
import HotSpotsPage from "../hotSpot/HotSpotsPage";
import MyCertsPage from "../myCerts/MyCertsPage";
import RolloutsPage from "../rollout/RolloutsPage";
import StatsPage from "../stats/StatsPage";

// Health
import FindUserPage from "../../healthcareProfessional/findUser/findUserPage";
import Healthtools from "../../healthcareProfessional/healthTools/healthTools";
import UpdateVaccination from "../../healthcareProfessional/healthTools/updateVaccination";
import AddVaccination from "../../healthcareProfessional/healthTools/addVaccination";
import AddCase from "../../healthcareProfessional/healthTools/addCase";

export const civRoutes = [
  {
    path: "/",
    element: <CivLandingPage />,
  },
  {
    path: "/civ/home",
    element: <CivilianHome />,
  },
  {
    path: "/civ/checkin",
    element: <CheckInPage back="/civ/home" />,
  },
  {
    path: "/civ/certs",
    element: <MyCertsPage back="/civ/home" />,
  },
  {
    path: "/civ/hotspot",
    element: <HotSpotsPage back="/civ/home" />,
  },
  {
    path: "/civ/rollout",
    element: <RolloutsPage back="/civ/home" />,
  },
  {
    path: "/civ/stats",
    element: <StatsPage back="/civ/home" />,
  },
  {
    path: "/hea/finduser",
    element: <FindUserPage />,
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
