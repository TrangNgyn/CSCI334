import { BsPeople } from "react-icons/bs";
import { CgOrganisation } from "react-icons/cg";

const menuOptions = [
  {
    icon: BsPeople,
    title: "Civilians",
    desc: "View all civilian accounts",
    route: "/ad/civ",
  },
  {
    icon: CgOrganisation,
    title: "Organisations",
    desc: "View all orginisation accounts",
    route: "/ad/org",
  },
];
export default menuOptions;