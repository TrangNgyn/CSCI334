import BusLandingPage from "../BusLandingPage";
import CheckInPage from "../checkIn/CheckInPage";

// Finish this
export const healthRoutes = [
  {
    element: <BusLandingPage />,
  },
  {
    path: "/hea/checkin",
    element: <CheckInPage />,
  },
];

export const healthMenuRoutes = [
  {
    title: "Check In",
    path: "bus/checkin",
  },
];
