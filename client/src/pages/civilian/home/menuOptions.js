import { BiCheckShield } from "react-icons/bi";
import { RiVirusLine } from "react-icons/ri";
import { FiMapPin } from "react-icons/fi";
import { BiStats } from "react-icons/bi";

export const menuOptions = [
  {
    icon: BiCheckShield,
    title: "My Certificates",
    desc: "View your latest vaccine certifications",
    route: "/civ/certs",
  },
  {
    icon: RiVirusLine,
    title: "Hotspot Map",
    desc: "Display any active cases near you",
    route: "/civ/hotspot",
  },
  {
    icon: FiMapPin,
    title: "Rollout Map",
    desc: "Vaccine rollouts in you area",
    route: "/civ/rollout",
  },
  {
    icon: BiStats,
    title: "Statistics",
    desc: "View viral statistics for your locality",
    route: "/civ/stats",
  },
];
