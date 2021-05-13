import BusLandingPage from "../BusLandingPage";
import CheckInPage from "../checkIn/CheckInPage";

export const busRoutes = [
  {
    path: "/",
    element: <BusLandingPage />,
  },
  {
    path: "/bus/checkin",
    element: <CheckInPage />,
  },
];
