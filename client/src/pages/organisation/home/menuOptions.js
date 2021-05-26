import { BsPersonPlus, BsPersonDash, BsPerson } from "react-icons/bs";

export const menuOptions = [
  {
    icon: BsPersonPlus,
    title: "Add Employee",
    desc: "Easily add new employees to your organisation",
    route: "/org/addemp",
  },
  {
    icon: BsPersonDash,
    title: "Remove Employee",
    desc: "Remove previous employees from your organisation",
    route: "/org/removeemp",
  },
  {
    icon: BsPerson,
    title: "Employee Stats",
    desc: "View the overall statistics of your employees",
    route: "/org/empstats",
  },
];
