import OrgLandingPage from "../OrgLandingPage";
import OrgHomePage from "../home/OrgHomePage";
import AddEmployeePage from "../addEmp/AddEmployeePage";
import StatsPage from "../stats/StatsPage";
import ViewEmployeesPage from "../viewEmps/ViewEmployeesPage";

export const orgRoutes = [
  {
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
    path: "/org/stats",
    element: <StatsPage />,
  },
  {
    path: "/org/viewemp",
    element: <ViewEmployeesPage />,
  },
];

export const orgMenuRoutes = [
  {
    title: "Home",
    path: "org/home",
  },
  {
    title: "Add Employee",
    path: "org/addemp",
  },
  {
    title: "View Statistics",
    path: "org/stats",
  },
  {
    title: "View Employees",
    path: "org/viewemps",
  },
];
