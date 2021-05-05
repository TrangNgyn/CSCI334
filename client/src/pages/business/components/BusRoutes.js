import BusLandingPage from "../BusLandingPage";
import CheckInPage from "../checkIn/CheckInPage";

export const busRoutes = [
  {
    element: <BusLandingPage />,
  },
  {
    path: "/bus/checkin",
    element: <CheckInPage />,
  },
];

export const busMenuRoutes = [
  {
    title: "Check In",
    path: "bus/checkin",
  },
];
