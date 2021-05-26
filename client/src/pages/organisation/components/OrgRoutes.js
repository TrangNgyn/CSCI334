import OrgLandingPage from "../OrgLandingPage";
import OrgHomePage from "../home/OrgHomePage";
//import AddEmployeePage from "../addEmp/AddEmployeePage";
import AddEmployeeManualPage from "../addEmp/AddEmployeeManualPage";
import RemoveEmployeeManualPage from "../addEmp/RemoveEmployeeManualPage";

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
    element: <AddEmployeeManualPage />,
  },
  {
    path: "/org/removeemp",
    element: <RemoveEmployeeManualPage />,
  },
];

export const orgMenuRoutes = [
  {
    title: "Add Employee",
    path: "/org/addemp",
  },
  {
    title: "Remove Employee",
    path: "/org/removeemp",
  },
];
