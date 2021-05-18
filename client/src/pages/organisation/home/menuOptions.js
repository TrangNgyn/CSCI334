import { BsPersonPlus } from "react-icons/bs";
import { BiStats } from "react-icons/bi";

export const menuOptions = [
  {
    icon: BsPersonPlus,
    title: "Add Employee",
    desc: "Easily add new employees to your organization",
    route: "/org/addemp",
  },
  {
    icon: BiStats,
    title: "Organisation Statistics",
    desc: "Check employee engagement and certifications",
    route: "/org/stats",
  },
];
