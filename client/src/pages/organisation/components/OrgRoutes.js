import OrgLandingPage from "../OrgLandingPage";
import OrgHomePage from "../home/OrgHomePage";
import AddEmployeePage from "../addEmp/AddEmployeePage";
import AddEmployeeManualPage from "../addEmp/AddEmployeeManualPage";
import StatsPage from "../stats/StatsPage";

export const orgRoutes = [
  {
    path: "/",
    element: <OrgLandingPage />,
  },
  {
    path: "/org/home",
    element: <OrgHomePage />,
  },
  {
    path: "/org/addemp",
    element: <AddEmployeePage />,
  },
  {
    path: "/org/addempmanual",
    element: <AddEmployeeManualPage />,
  },
  {
    path: "/org/stats",
    element: <StatsPage />,
  },
];

export const orgMenuRoutes = [
  {
    title: "Add Employee",
    path: "/org/addemp",
  },
  {
    title: "View Statistics",
    path: "/org/stats",
  },
];
