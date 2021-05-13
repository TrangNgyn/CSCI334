import { BsPeople } from "react-icons/bs";
import { BsPersonPlus } from "react-icons/bs";
import { BiStats } from "react-icons/bi";

export const menuOptions = [
  {
    icon: BsPeople,
    title: "View Employees",
    desc: "Manage your employee list and view their certifications",
    route: "/org/viewemp",
  },
  {
    icon: BsPersonPlus,
    title: "Add Employee",
    desc: "Easily add new employees to your organization",
    route: "/org/addemp",
  },
  {
    icon: BiStats,
    title: "Statistics",
    desc: "Check employee engagement and certifications",
    route: "/org/stats",
  },
];
